import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

const schema = yup.object({
    date: yup.date().required(),
    time: yup.string().required(),
    guests: yup.number().min(1,'too small number of guests').max(12).required(),
    occasion: yup.string()
}).required();

export default function BookingForm ({availableTimes, onDateChange, onSubmit}) {
    //sections: useForm - state - handlers - markup
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema),
        defaultValues: {
            date: new Date(),
            time: availableTimes[0],
            guests: 1,
            occasion: ''
        }
    });


    const onFormSubmit = (data) => {
        alert(data)
        onSubmit(data);
    };

    return(
        <>
            <h1>Book your table</h1>
            <form data-testid="myForm" onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="date">Choose date</label>
                <input {...register('date', {required: true, valueAsDate:true, onChange: (e) => onDateChange(e.target.value)})} type='date' id='date' />
                <label htmlFor="time">Choose time</label>
                <select {...register('time', {required: true})} id= 'time'>
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
                <input type="submit" value="Make Your reservation"/>
            </form>
        </>
    );
};