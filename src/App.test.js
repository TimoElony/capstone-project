import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';
import {BookingPage, initializeTimes, timesReducer} from "./BookingPage";

test('Renders the BookingForm heading', () => {
  render(<BookingForm availableTimes={['17:00','18:00']} onDateChange={()=>{}}/>);

  const headingElement = screen.getByText(/Book your table/);
  expect(headingElement).toBeInTheDocument();
})

test('Renders the BookingForm heading', () => {

  window.alert = jest.fn();
  render(<BookingForm availableTimes={['17:00','18:00']} onDateChange={()=>{}}/>);

  const submitButton = screen.getByText(/Make your reservation/i); // i for case insensitive
  expect(submitButton).toBeInTheDocument();

  fireEvent.click(submitButton);
  expect(window.alert).toHaveBeenCalledWith('submitted');
})

describe('initializeTimes', ()=>{
  test('validate that it returns the correct expected value', () => {
    const times = initializeTimes();
    expect(times).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ])
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