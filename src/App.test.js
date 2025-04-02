import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import BookingForm from './BookingForm';
import BookingPage from "./BookingPage";
import {fetchAPI} from  './api';

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
  expect(submitMocker).toHaveBeenCalled;
})


jest.mock('./api', ()=> ({fetchAPI: jest.fn()}));

describe('initializeTimes', ()=>{
  test('validate that it fetches the initial times from the external API and then passes them as props', async () => {
    // expectation: rendering -> api call -> receive -> pass on as props
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

describe('timesReducer', () => {
  test('validate that it returns the same value that is provided in the state', () => {
    const times = initializeTimes();
    const mockAction = {
      type: 'updated',
      date: '2025-03-18'
    }
    const newTimes = timesReducer(times, mockAction)
    expect(newTimes).toEqual(times);
  })
})