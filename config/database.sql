CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE ems;

CREATE TABLE patients (
    patient_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR (50),
    patient_mobile VARCHAR(20) NOT NULL,
    organization_id INTEGER REFERENCES organization(org_id),
    appointment_id INTEGER REFERENCES appointment(appointment_id)
);

CREATE TABLE appointment (
    appointment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT,
    patient_id INTEGER REFERENCES patients (patient_id),
    doctor_id INTEGER REFERENCES staff (staff_id), 
    organization_id INTEGER REFERENCES organization (org_id)
);

CREATE TABLE organization (
    org_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_name VARCHAR (250),
    org_username VARCHAR (100),
    org_mobile VARCHAR(20),
    org_address VARCHAR(250),
    org_city VARCHAR (50),
    org_state VARCHAR (50),
    org_zip_code VARCHAR(20),
    staff_id INTEGER REFERENCES staff (staff_id),
    patient_id INTEGER REFERENCES patients (patient_id),
    appointment_id INTEGER REFERENCES appointment (appointment_id)
);

CREATE TABLE staff (
    staff_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_name VARCHAR (100) NOT NULL,
    staff_email VARCHAR (100) NOT NULL UNIQUE,
    staff_gender VARCHAR (15) NOT NULL,
    staff_mobile VARCHAR (20) NOT NULL,
    specilization VARCHAR (100),
    appointment_id INTEGER REFERENCES appointment (appointment_id),
    org_id INTEGER REFERENCES organization (org_id)
);
