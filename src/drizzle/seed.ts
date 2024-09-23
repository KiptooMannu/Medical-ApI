import { db } from './db'; // Adjust the import as necessary
import {
    Departments,
    Users,
    Staff,
    Patients,
    Appointments,
    MedicalRecords,
    Billing,
    Payments,
    Inventory,
    SupportTickets,
    Messages,
    Authentication,
    LabTests,
    Schedules,
} from './schema'; // Import your tables

async function seed() {
    try {
        console.log("Seeding data...");

        // Insert Departments
        await db.insert(Departments).values([
            { name: 'Cardiology', head_id: null, contact_phone: '123456789', location: 'Building A' },
            { name: 'Neurology', head_id: null, contact_phone: '987654321', location: 'Building B' },
            { name: 'Pediatrics', head_id: null, contact_phone: '555555555', location: 'Building C' },
            { name: 'Oncology', head_id: null, contact_phone: '444444444', location: 'Building D' },
            { name: 'Orthopedics', head_id: null, contact_phone: '333333333', location: 'Building E' },
            { name: 'Dermatology', head_id: null, contact_phone: '222222222', location: 'Building F' },
            { name: 'Radiology', head_id: null, contact_phone: '111111111', location: 'Building G' },
            { name: 'Urology', head_id: null, contact_phone: '888888888', location: 'Building H' },
            { name: 'General Surgery', head_id: null, contact_phone: '999999999', location: 'Building I' },
            { name: 'Gynecology', head_id: null, contact_phone: '666666666', location: 'Building J' },
        ]);

        // Insert Users
        await db.insert(Users).values([
            { full_name: 'John Doe', email: 'john@example.com', contact_phone: '123456789', address: '123 Main St', role: 'doctor', department_id: 1 },
            { full_name: 'Jane Smith', email: 'jane@example.com', contact_phone: '987654321', address: '456 Elm St', role: 'nurse', department_id: 1 },
            { full_name: 'Alice Johnson', email: 'alice@example.com', contact_phone: '5555555555', address: '789 Pine St', role: 'patient' },
            { full_name: 'Bob Brown', email: 'bob@example.com', contact_phone: '7777777777', address: '321 Oak St', role: 'doctor', department_id: 2 },
            { full_name: 'Cathy Green', email: 'cathy@example.com', contact_phone: '8888888888', address: '654 Maple St', role: 'nurse', department_id: 2 },
            { full_name: 'David White', email: 'david@example.com', contact_phone: '2222222222', address: '987 Birch St', role: 'patient' },
            { full_name: 'Eva Black', email: 'eva@example.com', contact_phone: '3333333333', address: '135 Willow St', role: 'doctor', department_id: 3 },
            { full_name: 'Frank Blue', email: 'frank@example.com', contact_phone: '4444444444', address: '246 Cedar St', role: 'nurse', department_id: 3 },
            { full_name: 'Grace Red', email: 'grace@example.com', contact_phone: '5555555555', address: '369 Spruce St', role: 'patient' },
            { full_name: 'Hank Yellow', email: 'hank@example.com', contact_phone: '6666666666', address: '987 Palm St', role: 'doctor', department_id: 4 },
        ]);

        // Insert Staff
        await db.insert(Staff).values([
            { user_id: 1, position: 'Head Cardiologist', specialization: 'Cardiology', qualifications: 'MD', experience_years: 15, schedule: '9-5' },
            { user_id: 2, position: 'Cardiac Nurse', specialization: 'Cardiology', qualifications: 'BSN', experience_years: 5, schedule: '9-5' },
            { user_id: 4, position: 'Head Neurologist', specialization: 'Neurology', qualifications: 'MD', experience_years: 12, schedule: '9-5' },
            { user_id: 5, position: 'Neurology Nurse', specialization: 'Neurology', qualifications: 'BSN', experience_years: 4, schedule: '9-5' },
            { user_id: 7, position: 'Pediatrician', specialization: 'Pediatrics', qualifications: 'MD', experience_years: 10, schedule: '9-5' },
            { user_id: 8, position: 'Pediatric Nurse', specialization: 'Pediatrics', qualifications: 'BSN', experience_years: 3, schedule: '9-5' },
            { user_id: 10, position: 'Oncologist', specialization: 'Oncology', qualifications: 'MD', experience_years: 8, schedule: '9-5' },
            { user_id: 9, position: 'Oncology Nurse', specialization: 'Oncology', qualifications: 'BSN', experience_years: 6, schedule: '9-5' },
            { user_id: 3, position: 'General Practitioner', specialization: 'General', qualifications: 'MD', experience_years: 20, schedule: '9-5' },
            { user_id: 6, position: 'Nurse', specialization: 'General', qualifications: 'BSN', experience_years: 5, schedule: '9-5' },
        ]);

        // Insert Patients
        await db.insert(Patients).values([
            { user_id: 3, date_of_birth: new Date('1990-01-01'), gender: 'Female', blood_type: 'O+', medical_history: 'No significant history', allergies: 'None' },
            { user_id: 6, date_of_birth: new Date('1985-05-15'), gender: 'Male', blood_type: 'A-', medical_history: 'Asthma', allergies: 'None' },
            { user_id: 7, date_of_birth: new Date('2000-12-12'), gender: 'Female', blood_type: 'B+', medical_history: 'Allergic to pollen', allergies: 'Pollen' },
            { user_id: 8, date_of_birth: new Date('1992-08-22'), gender: 'Male', blood_type: 'AB+', medical_history: 'Diabetes', allergies: 'None' },
            { user_id: 9, date_of_birth: new Date('1995-01-01'), gender: 'Female', blood_type: 'O-', medical_history: 'None', allergies: 'None' },
            { user_id: 10, date_of_birth: new Date('1980-03-05'), gender: 'Male', blood_type: 'A+', medical_history: 'Hypertension', allergies: 'None' },
            { user_id: 1, date_of_birth: new Date('1988-07-20'), gender: 'Female', blood_type: 'O+', medical_history: 'None', allergies: 'None' },
            { user_id: 2, date_of_birth: new Date('1987-04-15'), gender: 'Male', blood_type: 'B-', medical_history: 'None', allergies: 'None' },
            { user_id: 3, date_of_birth: new Date('1999-06-30'), gender: 'Female', blood_type: 'AB-', medical_history: 'None', allergies: 'None' },
            { user_id: 4, date_of_birth: new Date('1993-11-11'), gender: 'Male', blood_type: 'O-', medical_history: 'None', allergies: 'None' },
        ]);

        // Insert Appointments
        await db.insert(Appointments).values([
            { patient_id: 1, doctor_id: 1, appointment_date: new Date('2024-09-25'), appointment_time: new Date('2024-09-25T09:00:00'), status: 'Scheduled', remarks: 'Follow-up visit' },
            { patient_id: 2, doctor_id: 1, appointment_date: new Date('2024-09-26'), appointment_time: new Date('2024-09-26T10:00:00'), status: 'Scheduled', remarks: 'Initial consult' },
            { patient_id: 3, doctor_id: 4, appointment_date: new Date('2024-09-27'), appointment_time: new Date('2024-09-27T11:00:00'), status: 'Scheduled', remarks: 'Follow-up visit' },
            { patient_id: 4, doctor_id: 4, appointment_date: new Date('2024-09-28'), appointment_time: new Date('2024-09-28T12:00:00'), status: 'Scheduled', remarks: 'Initial consult' },
            { patient_id: 5, doctor_id: 7, appointment_date: new Date('2024-09-29'), appointment_time: new Date('2024-09-29T09:00:00'), status: 'Scheduled', remarks: 'Routine check-up' },
            { patient_id: 6, doctor_id: 7, appointment_date: new Date('2024-09-30'), appointment_time: new Date('2024-09-30T10:00:00'), status: 'Scheduled', remarks: 'Routine check-up' },
        ]);

        // Insert Medical Records
// Insert Medical Records
await db.insert(MedicalRecords).values([
    { patient_id: 1, visit_date: new Date('2024-01-01'), diagnosis: 'Routine Check', treatment_plan: 'Medication prescribed', doctor_id: 1 },
    { patient_id: 2, visit_date: new Date('2024-01-02'), diagnosis: 'Flu', treatment_plan: 'Rest and hydration', doctor_id: 1 },
    { patient_id: 3, visit_date: new Date('2024-01-03'), diagnosis: 'Headache', treatment_plan: 'Pain relief medication', doctor_id: 4 },
    { patient_id: 4, visit_date: new Date('2024-01-04'), diagnosis: 'Back Pain', treatment_plan: 'Physical therapy', doctor_id: 4 },
    { patient_id: 5, visit_date: new Date('2024-01-05'), diagnosis: 'Check-up', treatment_plan: 'Routine blood work', doctor_id: 7 },
    { patient_id: 6, visit_date: new Date('2024-01-06'), diagnosis: 'Regular Check', treatment_plan: 'Vaccination', doctor_id: 7 },
]);


        // Insert Billing
        await db.insert(Billing).values([
            { total_amount: '150.00', due_date: new Date('2024-01-01'), created_at: new Date(), billing_date: new Date('2024-01-01') },
            { total_amount: '100.00', due_date: new Date('2024-01-02'), created_at: new Date(), billing_date: new Date('2024-01-02') },
            { total_amount: '200.00', due_date: new Date(), created_at: new Date(), billing_date: null },
            { total_amount: '250.00', due_date: new Date(), created_at: new Date(), billing_date: null },
            { total_amount: '150.00', due_date: new Date('2024-01-05'), created_at: new Date(), billing_date: new Date('2024-01-05') },
            { total_amount: '100.00', due_date: new Date('2024-01-06'), created_at: new Date(), billing_date: new Date('2024-01-06') },
        ]);
        

        // Insert Payments
await db.insert(Payments).values([
    { bill_id: 1, amount: 150.00 as unknown as string, payment_date: new Date('2024-01-01'), payment_method: 'Credit Card', created_at: new Date(), updated_at: new Date() },
    { bill_id: 2, amount: 100.00 as unknown as string, payment_date: new Date('2024-01-02'), payment_method: 'Cash', created_at: new Date(), updated_at: new Date() },
    { bill_id: 3, amount: 200.00 as unknown as string, payment_date: null, payment_method: 'Credit Card', created_at: new Date(), updated_at: new Date() },
    { bill_id: 4, amount: 250.00 as unknown as string, payment_date: null, payment_method: 'Cash', created_at: new Date(), updated_at: new Date() },
    { bill_id: 5, amount: 150.00 as unknown as string, payment_date: new Date('2024-01-05'), payment_method: 'Credit Card', created_at: new Date(), updated_at: new Date() },
    { bill_id: 6, amount: 100.00 as unknown as string, payment_date: new Date('2024-01-06'), payment_method: 'Cash', created_at: new Date(), updated_at: new Date() },
]);



        // Insert Inventory
  // Insert Inventory
await db.insert(Inventory).values([
    { 
        item_name: 'Bandages', 
        category: 'Medical Supplies', 
        quantity: 100, 
        reorder_level: 20, // Add appropriate reorder level
        supplier_info: 'ABC Supplies' // Use supplier_info instead of supplier
    },
    { 
        item_name: 'Syringes', 
        category: 'Medical Supplies', 
        quantity: 200, 
        reorder_level: 50,
        supplier_info: 'XYZ Supplies' 
    },
    { 
        item_name: 'Gloves', 
        category: 'Medical Supplies', 
        quantity: 150, 
        reorder_level: 30,
        supplier_info: 'DEF Supplies' 
    },
    { 
        item_name: 'Masks', 
        category: 'Medical Supplies', 
        quantity: 300, 
        reorder_level: 60,
        supplier_info: 'GHI Supplies' 
    },
    { 
        item_name: 'Alcohol Swabs', 
        category: 'Medical Supplies', 
        quantity: 500, 
        reorder_level: 100,
        supplier_info: 'JKL Supplies' 
    },
    { 
        item_name: 'Scissors', 
        category: 'Medical Supplies', 
        quantity: 50, 
        reorder_level: 10,
        supplier_info: 'MNO Supplies' 
    },
]);

        

        // Insert Support Tickets
// Insert Support Tickets
await db.insert(SupportTickets).values([
    { user_id: 1, subject: 'Need assistance with billing', description: 'Details regarding billing issues.', status: 'Open', created_at: new Date(), updated_at: new Date() },
    { user_id: 2, subject: 'Request for medical records', description: 'Requesting past medical records.', status: 'Open', created_at: new Date(), updated_at: new Date() },
    { user_id: 3, subject: 'Follow-up on appointment', description: 'Need to follow up on my last appointment.', status: 'Closed', created_at: new Date(), updated_at: new Date() },
    { user_id: 4, subject: 'General inquiry', description: 'Inquiry about general health services.', status: 'Open', created_at: new Date(), updated_at: new Date() },
    { user_id: 5, subject: 'Help with prescription', description: 'Need assistance with my prescription.', status: 'Closed', created_at: new Date(), updated_at: new Date() },
    { user_id: 6, subject: 'Schedule a follow-up appointment', description: 'I need to schedule a follow-up appointment.', status: 'Open', created_at: new Date(), updated_at: new Date() },
]);

        // Insert Messages
        await db.insert(Messages).values([
            { 
                sender_id: 1, // ID of the sender, replace with actual user ID
                receiver_id: 2, // ID of the receiver, replace with actual user ID
                message_content: 'I need assistance with my recent billing issue.', 
                timestamp: new Date(), 
                is_read: false 
            },
            { 
                sender_id: 2, // ID of the sender, replace with actual user ID
                receiver_id: 1, // ID of the receiver, replace with actual user ID
                message_content: 'Can you provide more details about the issue?', 
                timestamp: new Date(), 
                is_read: false 
            },
            { 
                sender_id: 1, 
                receiver_id: 2, 
                message_content: 'I would like a copy of my medical records.', 
                timestamp: new Date(), 
                is_read: false 
            },
            { 
                sender_id: 2, 
                receiver_id: 1, 
                message_content: 'Your appointment has been confirmed.', 
                timestamp: new Date(), 
                is_read: false 
            },
            { 
                sender_id: 1, 
                receiver_id: 2, 
                message_content: 'What are the visiting hours?', 
                timestamp: new Date(), 
                is_read: false 
            },
            { 
                sender_id: 2, 
                receiver_id: 1, 
                message_content: 'Your prescription is ready for pickup.', 
                timestamp: new Date(), 
                is_read: false 
            },
        ]);
        

  // Insert Authentication
await db.insert(Authentication).values([
    { user_id: 1, password_hash: 'hashed_password1', created_at: new Date(), updated_at: new Date() },
    { user_id: 2, password_hash: 'hashed_password2', created_at: new Date(), updated_at: new Date() },
    { user_id: 3, password_hash: 'hashed_password3', created_at: new Date(), updated_at: new Date() },
    { user_id: 4, password_hash: 'hashed_password4', created_at: new Date(), updated_at: new Date() },
    { user_id: 5, password_hash: 'hashed_password5', created_at: new Date(), updated_at: new Date() },
    { user_id: 6, password_hash: 'hashed_password6', created_at: new Date(), updated_at: new Date() },
]);




// Insert Schedules
await db.insert(Schedules).values([
    { staff_id: 1, day_of_week: 'Monday', start_time: new Date('2024-09-25T09:00:00Z'), end_time: new Date('2024-09-25T17:00:00Z') },
    { staff_id: 2, day_of_week: 'Tuesday', start_time: new Date('2024-09-26T09:00:00Z'), end_time: new Date('2024-09-26T17:00:00Z') },
    { staff_id: 4, day_of_week: 'Wednesday', start_time: new Date('2024-09-27T09:00:00Z'), end_time: new Date('2024-09-27T17:00:00Z') },
    { staff_id: 5, day_of_week: 'Thursday', start_time: new Date('2024-09-28T09:00:00Z'), end_time: new Date('2024-09-28T17:00:00Z') },
    { staff_id: 7, day_of_week: 'Friday', start_time: new Date('2024-09-29T09:00:00Z'), end_time: new Date('2024-09-29T17:00:00Z') },
    { staff_id: 8, day_of_week: 'Saturday', start_time: new Date('2024-09-30T09:00:00Z'), end_time: new Date('2024-09-30T17:00:00Z') },
]);

        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

// Call the seed function
seed();
