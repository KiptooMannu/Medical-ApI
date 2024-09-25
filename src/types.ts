// types.ts

export interface Department {
    department_id: number;
    name: string;
    head_id?: number;         // Optional, depending on your schema
    contact_phone?: string;   // Optional, depending on your schema
    location?: string;        // Optional, depending on your schema
}

export interface ServiceResponse<T> {
    message: string;
    data?: T;
}



export type TSDepartments = {
    department_id: number;
    name: string;
    head_id?: number | null; // head_id can be null
    contact_phone?: string | null; // contact_phone can be null
    location?: string | null; // location can be null
    created_at: Date;
    updated_at: Date;
};

export type TIDepartments = Omit<TSDepartments, 'department_id' | 'created_at' | 'updated_at'>; // Exclude id and timestamps on insert





export interface TSPatients {
    created_at: Date | null;
    updated_at: Date | null;
    user_id: number | null;
    patient_id: number;
    date_of_birth: Date;
    gender: string;
    blood_type: string | null; // Ensure this matches your data expectations
    medical_history: string | null;
    allergies: string | null;
}
