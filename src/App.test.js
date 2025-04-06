import { render, screen, fireEvent, renderHook, act, waitFor } from "@testing-library/react";
import BookingForm from './BookingForm';
import BookingPage from "./BookingPage";
//import Main from './Main';
import updateTimes from "./BookingPage";
import {fetchAPI} from  './api';
import BookingConfirmed from "./BookingConfirmed";
import { useLocation } from "react-router";
import { wait } from "@testing-library/user-event/dist/utils";

window.alert = jest.fn();
jest.mock('react-router', ()=> ({
  useLocation: jest.fn()
}));

jest.mock('./api', ()=> ({fetchAPI: jest.fn()}));



//unit tests don't work because taking async functions outside of the component and just calling them doesnt seem to work very well, it makes the component disfunctional
// test('updateTimes', async ()=> {
//   const mockDispatch = jest.fn();
//   const mockTimes = ['17:00','18:00','24:00'];

//   fetchAPI.mockResolvedValue(mockTimes);

//   await updateTimes(new Date, mockDispatch);

//   expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
//   expect(mockDispatch).toHaveBeenCalledWith({type: 'date changed', payload: mockTimes})
// })

//unit test of the validation from data entered to successfull submit
test('successful validation formData is emitted without error messages', async ()=>{
  const submitMocker = jest.fn();
  render(<BookingForm availableTimes={[]} onDateChange={()=>{}} onSubmit={submitMocker}/>);
  //const {handleSubmit} = renderHook(()=>useForm());

  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const guestInput = screen.getByLabelText(/guests/i);
  const occasionInput = screen.getByLabelText(/occasion/i);

  fireEvent.change(dateInput, { target: { value: '2025-09-01' } });
  fireEvent.change(timeInput, { target: { value: '17:31' } });
  fireEvent.change(guestInput, { target: { value: '4' } });
  fireEvent.change(occasionInput, { target: { value: 'Birthday' } });

  const formElement = screen.getByTestId('myForm');
  fireEvent.submit(formElement);

  expect(submitMocker).toHaveBeenCalled();

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