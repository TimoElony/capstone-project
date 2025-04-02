import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from './BookingForm';
import {initializeTimes, updateTimes } from "./BookingPage";
import BookingPage from "./BookingPage";
import {fetchAPI} from  './api';

window.alert = jest.fn();
jest.mock('./api', ()=> ({fetchAPI: jest.fn()}));

//unit tests: initialize times not really possible
/* test('initializeTimes', async ()=> {
  const mockDispatch = jest.fn();
  const mockTimes = ['17:00','18:00','24:00'];

  fetchAPI.mockResolvedValue(mockTimes);

  await initializeTimes(mockDispatch);

  expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(mockDispatch).toHaveBeenCalledWith({type: 'initialized', payload: mockTimes})
}) */

test('updateTimes', async ()=> {
  const mockDispatch = jest.fn();
  const mockTimes = ['17:00','18:00','24:00'];

  fetchAPI.mockResolvedValue(mockTimes);

  await updateTimes(new Date, mockDispatch);

  expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(mockDispatch).toHaveBeenCalledWith({type: 'date changed', payload: mockTimes})
})

test('Renders the BookingForm heading', () => {
  render(<BookingForm availableTimes={[]} onDateChange={()=>{}}/>);

  const headingElement = screen.getByText(/Book your table/);
  expect(headingElement).toBeInTheDocument();
})

test('Submit button is in the document and working', () => {

  const submitMocker = jest.fn();
  render(<BookingForm availableTimes={[]} onDateChange={()=>{}} onSubmit={submitMocker}/>);

  const submitButton = screen.getByText(/Make your reservation/i); // i for case insensitive

  fireEvent.click(submitButton);
  expect(submitMocker).toHaveBeenCalled();
})

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
      expect(fetchAPI).toHaveBeenCalledWith(mockDateObject);
      mockTimesSecond.forEach((time) => {
        expect(screen.getByText(time)).toBeInTheDocument(); // Ensure times appear in UI
      });
    });
    expect(fetchAPI).toHaveBeenCalledTimes(2);
})