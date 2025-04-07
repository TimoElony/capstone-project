import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

const schema = yup.object({
    date: yup.date().required().min(new Date('2025-03-01'),'too early'),
    time: yup.string().required(),
    guests: yup.number().required().min(1,'too small number of guests').max(12, 'too many people'),
    occasion: yup.string().oneOf(["Birthday", "Anniversary", 'None Specified'], 'invalid occasion')
}).required();

export default function BookingForm ({availableTimes, onDateChange, onSubmit}) {
    //sections: useForm - state - handlers - markup
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema),
        defaultValues: {
            date: new Date(),
            time: '16:00',
            guests: 1,
            occasion: ''
        }
    });

    return(
        <>
            <h1>Book your table</h1>
            <form data-testid="myForm" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="date">Choose date</label>
                <input {...register('date', {required: true, valueAsDate:true, onChange: (e)=>(onDateChange(e.target.value))})}  type='date' id='date' />
                <p>{errors.date?.message}</p>
                <label htmlFor="time">Choose time</label>
                <select {...register('time', {required: true, onChange: (e)=>(e.target.value)})} id= 'time'>
                    {
                        availableTimes.map((time, index)=> (
                            <option key={index} value={time}>{time}</option>
                        ))
                    }
                </select>
                <p>{errors.time?.message}</p>
                <label htmlFor="guests">Number of guests</label>
                <input {...register('guests', {required: true, type: 'number'})} id='guests' placeholder='1'/>
                <p>{errors.guests?.message}</p>
                <label htmlFor="occasion">Occasion</label>
                <select {...register('occasion')} id='occasion'>
                    <option value={'Not specified'}>None specified</option>
                    <option value={'Birthday'}>Birthday</option>
                    <option value={'Anniversary'}>Anniversary</option>
                </select>
                <p>{errors.occasion?.message}</p>
                <input type="submit" value="Make Your reservation" aria-label='On Click'/>
            </form>
        </>
    );
};