import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.css'

function SimpleInterest({setFinalInterst,setInterest,interest,setTotalAmount}){
    const initialValues = {
        principal: '',
        rate: '',
        time: '',
    };
    
    const validationSchema = Yup.object().shape({
        principal: Yup.number().required('Principal is required').positive('Principal must be positive'),
        rate: Yup.number().required('Rate is required').positive('Rate must be positive'),
        time: Yup.number().required('Time is required').positive('Time must be positive'),
    });
    
    const calculateInterest = (values) => {
        console.log(values,'values123');
        const { principal, rate, time } = values;
        const simpleInterest = (principal * rate * time) / (100*30);
        setFinalInterst(simpleInterest)
        setTotalAmount(principal+simpleInterest)
    }; 
    const handleback=()=>{
        setInterest(!interest)
        setFinalInterst(0)
        setTotalAmount(0)
    }
    return(
        <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={calculateInterest}
      >
        <Form className={styles.form_container}>
          <div className={styles.adjust}>
            <Field type="number" name="principal" placeholder="principal amount"/>
            <ErrorMessage name="principal" component="div" />
          </div>
          <div className={styles.adjust}>
            <Field type="number" name="rate" placeholder="Rate (%)"/>
            <ErrorMessage name="rate" component="div" />
          </div>
          <div className={styles.adjust}>
            <Field type="number" name="time" placeholder="Time (days)"/>
            <ErrorMessage name="time" component="div" />
          </div>
          <div className={styles.adjust}>
            <button type="submit">Calculate</button>
          </div>
          <div className={styles.adjust}>
            <button type="submit" onClick={()=>handleback()}>Back</button>
          </div>
        </Form>
      </Formik>
    </div>
    )
};
export default SimpleInterest;