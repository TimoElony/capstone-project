import { render, screen, fireEvent, renderHook, act, waitFor } from "@testing-library/react";
import BookingForm from './BookingForm';
import BookingPage from "./BookingPage";
import {fetchAPI} from  './api';
import BookingConfirmed from "./BookingConfirmed";
import { useLocation } from "react-router";

//Mocking external APIs
window.alert = jest.fn();
jest.mock('react-router', ()=> ({
  useLocation: jest.fn()
}));

jest.mock('./api', ()=> ({fetchAPI: jest.fn()}));

// Tests below
// unit test of the validation from data entered to successfull submit
const submit = jest.fn();
it('should call submit function with the given input values', async ()=>{
  render(<BookingForm availableTimes={['16:00','17:00','18:00']} onDateChange={()=>{}} onSubmit={submit}/>);

  fireEvent.input(await screen.getByLabelText(/date/i), { target: { value: '2025-09-01' } });
  fireEvent.change(await screen.getByLabelText(/time/i), { target: { value: '17:00' } });
  fireEvent.input(await screen.getByLabelText(/guests/i), { target: { value: '4' } });
  fireEvent.change(await screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

  const formElement = screen.getByTestId('myForm');
  fireEvent.submit(formElement);

  //this await is crucial
  await waitFor(()=>{
    expect(submit).toHaveBeenCalledWith({
      time:'17:00',
      date: new Date('2025-09-01'),
      guests: 4,
      occasion: 'Birthday'
    }, expect.anything());
  })
})

//unit test of the BookingConfirmed Page
test('successful validation -> all form data is displayed', ()=>{
  useLocation.mockReturnValue({
    state: {
      date: new Date('2023-10-27'),
      time: '12:00',
      guests: 2,
      occasion: 'Birthday',
    },
  });

  render(<BookingConfirmed />);

  expect(screen.getByText(/2023/)).toBeInTheDocument();
  expect(screen.getByText('12:00')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('Birthday')).toBeInTheDocument();
})

test('BookingForm input elements have the correct attributes', ()=>{
  render(<BookingForm availableTimes={[]} onDateChange={()=>{}}/>);

  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const guestInput = screen.getByLabelText(/guests/i);
  const occasionInput = screen.getByLabelText(/occasion/i);

  expect(dateInput).toHaveAttribute('type', 'date');
  expect(timeInput).toHaveAttribute('id', 'time');
  expect(guestInput).toHaveAttribute('id', 'guests');
  expect(occasionInput).toHaveAttribute('id', 'occasion');
})

test('Renders the BookingForm heading', () => {
  render(<BookingForm availableTimes={[]} onDateChange={()=>{}}/>);

  const headingElement = screen.getByText(/Book your table/);
  expect(headingElement).toBeInTheDocument();
})


describe('initializeTimes', ()=>{
  test('validate that it fetches the initial times from the external API and then passes them as props', async () => {
    // expectation: Booking Page rendering -> api call -> receive -> rendering booking form -> writing into dropdown
    const mockTimes = ['17:00','18:00','24:00'];
    fetchAPI.mockResolvedValue(mockTimes);

    render(<BookingPage onSubmit={jest.fn()} />);

    await waitFor(() => {
      mockTimes.forEach((time) => {
        expect(screen.getByText(time)).toBeInTheDocument(); // Ensure times appear in UI
      });
    });
  })
})

describe('updateTimes', () => {
  test('validate that it calls the API with the provided date and dispatches correct time', async () => {
    //expectation: rendering - init (see test above) -> button is clicked -> selected Date is sent to API by updateTimes -> action dispatched to reducer -> state changed -> dropdown has new values
    const mockTimesFirst = ['17:00','18:00','24:00', '23:00'];
    const mockTimesSecond = ['16:00','19:00','20:00', '21:00'];
    fetchAPI
      .mockResolvedValueOnce(mockTimesFirst)
      .mockResolvedValueOnce(mockTimesSecond);

    const submitMocker = jest.fn();
    render(<BookingPage onSubmit={submitMocker} />);

    const dateSelector = screen.getByLabelText(/Choose date/i);
    const mockDate = '2025-04-07';
    const mockDateObject= new Date(mockDate);

    fireEvent.change(dateSelector, {target: {value: mockDate}});

    await waitFor(()=>{
      expect(fetchAPI).toHaveBeenCalled;
    })//first API call not part of this test
    await waitFor(()=>{
      expect(fetchAPI).toHaveBeenCalledTimes(2);
      expect(fetchAPI).toHaveBeenCalledWith(mockDateObject);
      mockTimesSecond.forEach((time) => {
        expect(screen.getByText(time)).toBeInTheDocument(); // Ensure times appear in UI
      });
    });

  })
})