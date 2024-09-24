
import { pgTable, serial, varchar, text, integer, boolean, timestamp, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


// Enum Definitions
export const roleEnum = pgEnum("role", ["patient", "doctor", "nurse", "staff", "admin"]);
export const appointmentStatusEnum = pgEnum("appointment_status", ["Scheduled", "Completed", "Cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Pending", "Paid", "Overdue"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["Open", "In Progress", "Resolved", "Closed"]);

// Departments Table
export const Departments = pgTable('departments', {
    department_id: serial('department_id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    head_id: integer('head_id'),  // Remove circular reference temporarily
    contact_phone: varchar('contact_phone', { length: 15 }),
    location: text('location'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Users Table
export const Users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    full_name: varchar('full_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    contact_phone: varchar('contact_phone', { length: 15 }),
    address: text('address'),
    role: roleEnum("role").default("patient"),
    department_id: integer('department_id').references(() => Departments.department_id, { onDelete: 'set null' }),  // Lazy reference
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Staff Table
export const Staff = pgTable('staff', {
    staff_id: serial('staff_id').primaryKey(),
    user_id: integer('user_id').references(() => Users.user_id, { onDelete: 'cascade' }),  // Lazy reference to Users
    position: varchar('position', { length: 255 }).notNull(),
    specialization: varchar('specialization', { length: 255 }),
    qualifications: text('qualifications'),
    experience_years: integer('experience_years'),
    schedule: text('schedule'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Patients Table
export const Patients = pgTable('patients', {
    patient_id: serial('patient_id').primaryKey(),
    user_id: integer('user_id').references(() => Users.user_id, { onDelete: 'cascade' }),
    date_of_birth: timestamp('date_of_birth').notNull(),
    gender: varchar('gender', { length: 10 }).notNull(),
    blood_type: varchar('blood_type', { length: 3 }),
    medical_history: text('medical_history'),
    allergies: text('allergies'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Appointments Table
export const Appointments = pgTable('appointments', {
    appointment_id: serial('appointment_id').primaryKey(),
    patient_id: integer('patient_id').references(() => Patients.patient_id, { onDelete: 'cascade' }),
    doctor_id: integer('doctor_id').references(() => Staff.staff_id, { onDelete: 'cascade' }),
    appointment_date: timestamp('appointment_date').notNull(),
    appointment_time: timestamp('appointment_time').notNull(),
    status: appointmentStatusEnum("appointment_status").default("Scheduled"),
    remarks: text('remarks'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Medical Records Table
export const MedicalRecords = pgTable('medical_records', {
    record_id: serial('record_id').primaryKey(),
    patient_id: integer('patient_id').references(() => Patients.patient_id, { onDelete: 'cascade' }),
    doctor_id: integer('doctor_id').references(() => Staff.staff_id, { onDelete: 'cascade' }),
    visit_date: timestamp('visit_date').notNull(),
    symptoms: text('symptoms'),
    diagnosis: text('diagnosis'),
    treatment_plan: text('treatment_plan'),
    prescriptions: text('prescriptions'),
    lab_results: text('lab_results'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});
// Billing Table
export const Billing = pgTable('billing', {
    bill_id: serial('bill_id').primaryKey(),
    patient_id: integer('patient_id').references(() => Patients.patient_id, { onDelete: 'cascade' }),
    appointment_id: integer('appointment_id').references(() => Appointments.appointment_id, { onDelete: 'cascade' }),
    total_amount: decimal('total_amount').notNull(),
    amount_paid: decimal('amount_paid').notNull().default('0'),
    payment_status: paymentStatusEnum("payment_status").default("Pending"),
    billing_date: timestamp('billing_date').defaultNow(),
    due_date: timestamp('due_date').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});


// Payments Table
export const Payments = pgTable('payments', {
    payment_id: serial('payment_id').primaryKey(),
    bill_id: integer('bill_id').references(() => Billing.bill_id, { onDelete: 'cascade' }),
    amount: decimal('amount').notNull(),
    payment_method: varchar('payment_method', { length: 255 }),
    transaction_id: varchar('transaction_id', { length: 255 }),
    payment_date: timestamp('payment_date').defaultNow(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Inventory Table
export const Inventory = pgTable('inventory', {
    item_id: serial('item_id').primaryKey(),
    item_name: varchar('item_name', { length: 255 }).notNull(),
    category: varchar('category', { length: 255 }).notNull(),
    quantity: integer('quantity').notNull(),
    reorder_level: integer('reorder_level').notNull(),
    supplier_info: text('supplier_info'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Support Tickets Table
export const SupportTickets = pgTable('support_tickets', {
    ticket_id: serial('ticket_id').primaryKey(),
    user_id: integer('user_id').references(() => Users.user_id, { onDelete: 'cascade' }),
    subject: varchar('subject', { length: 255 }).notNull(),
    description: text('description').notNull(),
    status: ticketStatusEnum("ticket_status").default("Open"),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Messages Table
export const Messages = pgTable('messages', {
    message_id: serial('message_id').primaryKey(),
    sender_id: integer('sender_id').references(() => Users.user_id, { onDelete: 'cascade' }),
    receiver_id: integer('receiver_id').references(() => Users.user_id, { onDelete: 'cascade' }),
    message_content: text('message_content').notNull(),
    timestamp: timestamp('timestamp').defaultNow(),
    is_read: boolean('is_read').default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Authentication Table
export const Authentication = pgTable('authentication', {
    auth_id: serial('auth_id').primaryKey(),
    user_id: integer('user_id').references(() => Users.user_id, { onDelete: 'cascade' }),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Lab Tests Table
export const LabTests = pgTable('lab_tests', {
    lab_test_id: serial('lab_test_id').primaryKey(),
    record_id: integer('record_id').references(() => MedicalRecords.record_id, { onDelete: 'cascade' }),
    test_type: varchar('test_type', { length: 255 }).notNull(),
    test_date: timestamp('test_date').notNull(),
    results: text('results'),
    normal_range: text('normal_range'),
    comments: text('comments'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Schedules Table
export const Schedules = pgTable('schedules', {
    schedule_id: serial('schedule_id').primaryKey(),
    staff_id: integer('staff_id').references(() => Staff.staff_id, { onDelete: 'cascade' }),
    day_of_week: varchar('day_of_week', { length: 10 }).notNull(),
    start_time: timestamp('start_time').notNull(),
    end_time: timestamp('end_time').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Define Relationships
export const DepartmentRelations = relations(Departments, ({ many }) => ({
    users: many(Users),
}));

export const UserRelations =

 relations(Users, ({ one, many }) => ({
    department: one(Departments, { fields: [Users.department_id], references: [Departments.department_id] }),
    staff: many(Staff),
    patients: many(Patients),
    tickets: many(SupportTickets),
    authentication: one(Authentication, { fields: [Users.user_id], references: [Authentication.user_id] }),
}));

export const StaffRelations = relations(Staff, ({ one, many }) => ({
    user: one(Users, { fields: [Staff.user_id], references: [Users.user_id] }),
    appointments: many(Appointments),
    medicalRecords: many(MedicalRecords),
}));

export const PatientRelations = relations(Patients, ({ one, many }) => ({
    user: one(Users, { fields: [Patients.user_id], references: [Users.user_id] }),
    appointments: many(Appointments),
    medicalRecords: many(MedicalRecords),
}));

export const AppointmentRelations = relations(Appointments, ({ one }) => ({
    patient: one(Patients, { fields: [Appointments.patient_id], references: [Patients.patient_id] }),
    doctor: one(Staff, { fields: [Appointments.doctor_id], references: [Staff.staff_id] }),
    billing: one(Billing, { fields: [Appointments.appointment_id], references: [Billing.appointment_id] }),
}));

export const MedicalRecordRelations = relations(MedicalRecords, ({ one }) => ({
    patient: one(Patients, { fields: [MedicalRecords.patient_id], references: [Patients.patient_id] }),
    doctor: one(Staff, { fields: [MedicalRecords.doctor_id], references: [Staff.staff_id] }),
}));

// Define Relationships
export const BillingRelations = relations(Billing, ({ one, many }) => ({
    patient: one(Patients, { fields: [Billing.patient_id], references: [Patients.patient_id] }),
    appointment: one(Appointments, { fields: [Billing.appointment_id], references: [Appointments.appointment_id] }),
    payments: many(Payments),
}));


export const PaymentRelations = relations(Payments, ({ one }) => ({
    bill: one(Billing, { fields: [Payments.bill_id], references: [Billing.bill_id] }),
}));

export const SupportTicketRelations = relations(SupportTickets, ({ one }) => ({
    user: one(Users, { fields: [SupportTickets.user_id], references: [Users.user_id] }),
}));

export const MessageRelations = relations(Messages, ({ one }) => ({
    sender: one(Users, { fields: [Messages.sender_id], references: [Users.user_id] }),
    receiver: one(Users, { fields: [Messages.receiver_id], references: [Users.user_id] }),
}));

export const AuthRelations = relations(Authentication, ({ one }) => ({
    user: one(Users, { fields: [Authentication.user_id], references: [Users.user_id] }),
}));

export const LabTestRelations = relations(LabTests, ({ one }) => ({
    record: one(MedicalRecords, { fields: [LabTests.record_id], references: [MedicalRecords.record_id] }),
}));

export const ScheduleRelations = relations(Schedules, ({ one }) => ({
    staff: one(Staff, { fields: [Schedules.staff_id], references: [Staff.staff_id] }),
}));

// Inferred Types
export type TIUsers = typeof Users.$inferInsert;
export type TSUsers = typeof Users.$inferSelect;
export type TIAppointments = typeof Appointments.$inferInsert;
export type TSAppointments = typeof Appointments.$inferSelect;
export type TIMedicalRecords = typeof MedicalRecords.$inferInsert;
export type TSMedicalRecords = typeof MedicalRecords.$inferSelect;
export type TIBilling = typeof Billing.$inferInsert;
export type TSBilling = typeof Billing.$inferSelect;
export type TIPayments = typeof Payments.$inferInsert;
export type TSPayments = typeof Payments.$inferSelect;
export type TIInventory = typeof Inventory.$inferInsert;
export type TSInventory = typeof Inventory.$inferSelect;
export type TISupportTickets = typeof SupportTickets.$inferInsert;
export type TSSupportTickets = typeof SupportTickets.$inferSelect;
export type TIMessages = typeof Messages.$inferInsert;
export type TSMessages = typeof Messages.$inferSelect;
export type TIAuthentication = typeof Authentication.$inferInsert;
export type TSAuthentication = typeof Authentication.$inferSelect;
export type TILabTests = typeof LabTests.$inferInsert;
export type TSLabTests = typeof LabTests.$inferSelect;
export type TISchedules = typeof Schedules.$inferInsert;
export type TSSchedules = typeof Schedules.$inferSelect;
export type TIPatients = typeof Patients.$inferInsert;
export type TSPatients = typeof Patients.$inferSelect;


