
export const TREATMENT_PHASES = {
    CONSENT: { id: 1, order: 1 },
    SCREENING: { id: 2, order: 2 },
    SCHEDULING: { id: 3, order: 3 },
    MANUFACTURER_REQUEST_LISTING: { id: 4, order: 4 },
    HOSPITAL_COLLECTION: { id: 5, order: 5 },
    LOGISTIC_REQUEST: { id: 6, order: 6 },
    LOGISTIC_PICKUP: { id: 7, order: 7 },
    LOGISTIC_DELIVERY: { id: 8, order: 8 },
    MANUFACTURER_SAMPLE_COLLECTION: { id: 9, order: 9 },
    OUTBOUND_SCHEDULING: { id: 10, order: 10 },
    OUTBOUND_LOGISTIC_REQUEST: { id: 11, order: 11 },
    OUTBOUND_LOGISTIC_PICKUP: { id: 12, order: 12 },
    OUTBOUND_LOGISTIC_DELIVERY: { id: 13, order: 13 },
    HOSPITAL_TREATMENT: { id: 14, order: 14 },
    AFTER_CARE: { id: 15, order: 15 },
}

const URL_TYPE = {
    patient: 1,
    treatment: 2
}
export const INVENTORY_OUTBOUND_STATUS_STEPS = [
    {
        id: 1,
        name: 'Store Sample',
        alias: 'STORE_SAMPLE',
        phaseId: 1,
        url_slug: '/inventory/storage/location',
        params: {}
    },
    {
        id: 2,
        name: 'Outbound Process',
        alias: 'OUTBOUND_PROCESS',
        phaseId: 2,
        url_slug: '/inventory/treatment/outboundProcess?view=OUTBOUND_PROCESS',
        params: {}
    },
    {
        id: 3,
        name: 'Courier',
        alias: 'COURIER',
        phaseId: 3,
        // url_slug: '/inventory/treatment/outboundProcess/',
        params: {}
    },
];
export const PATIENT_TREATMENT_PHASES = [
    {
        id: 1,
        name: 'Screening',
        alias: 'SCREENING',
        phaseId: 3,
        // phaseId: 2, // 2 is using in the patient list , if you need to change please concern @naveed
        url_slug: '/hospital/patients/',
        url_type: URL_TYPE.patient,
        params: { view: 'Screening' }
    },
    {
        id: 2,
        name: 'Scheduling',
        alias: 'SCHEDULING',
        phaseId: 4,// requesting manufacturer reject fix on 3 | before its state is 3(Scheduling ) we change this because active work  treatmentPhase > static phase;
        url_slug: '/hospital/patients/',
        url_type: URL_TYPE.patient,
        params: { view: 'Scheduling' }
    },
    {
        id: 3,
        name: 'Collection',
        alias: 'COLLECTION',
        phaseId: 6,//   before its state is 7(logistic pick ) we change this because collection phase complete and now handover to logistic;
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'collection' }
    },
    {
        id: 4,
        name: 'Shipment',
        alias: 'SHIPMENT',
        phaseId: 14,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'shipment' }
    },
    {
        id: 5,
        name: 'Treatment',
        alias: 'TREATMENT_COLLECTION',
        phaseId: 15,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'treatment' }
    },
    {
        id: 6,
        name: 'After Care',
        alias: 'AFTER_CARE',
        phaseId: 16,
        url_slug: '/hospital/patients/collection/',
        url_type: URL_TYPE.treatment,
        params: { view: 'after-care' }
    },
]



export const MANUFACTURER_TREATMENT_PENDING_PHASES = [
    {
        id: 1,
        name: 'Inbound Shipment',
        alias: 'INBOUND_SHIPMENT',
        phaseId: 5,
        enablePageId: 4,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'INBOUND_SHIPMENT' },
        className: 'INBOUND_SHIPMENT'
    },
    {
        id: 2,
        name: 'Manufacturer',
        alias: 'MANUFACTURER',
        phaseId: 9,
        enablePageId: 10,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'MANUFACTURER' },
        className: 'MANUFACTURER'
    },
    {
        id: 3,
        name: 'Outbound Shipment',
        alias: 'OUTBOUND_SHIPMENT',
        phaseId: 10,
        enablePageId: 14,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.treatment,
        params: { view: 'OUTBOUND_SHIPMENT' },
        className: 'OUTBOUND_SHIPMENT'
    },
]
// for Pending_Phases
export const MANUFACTURER_TREATMENT_PENDING_PHASES_DETAILS = [
    {
        id: 1,
        name: 'Inbound Acceptance Details',
        alias: 'INBOUND_SHIPMENT',
        phaseId: 3,
        enablePageId: 3,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'INBOUND_SHIPMENT' }
    },
    {
        id: 2,
        name: 'Manufacturing',
        alias: 'MANUFACTURER',
        phaseId: 10,
        enablePageId: 9,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.patient,
        params: { view: 'MANUFACTURER' }
    },
    {
        id: 3,
        name: 'Outbound Shipment',
        alias: 'OUTBOUND_SHIPMENT',
        phaseId: 14,
        enablePageId: 10,
        url_slug: '/manufacturer/treatments/process/',
        url_type: URL_TYPE.treatment,
        params: { view: 'OUTBOUND_SHIPMENT' }
    },
]

export const QUARANTINE_PROCESS_PHASES = [
    {
        id: 1,
        name: 'Inbound Acceptance',
        alias: 'INBOUND_ACCEPTANCE_DETAILS',
        phaseId: 8,
        enablePageId: 5,
        url_slug: '/inventory/treatment/process?view=INBOUND_ACCEPTANCE_DETAILS',
        url_type: URL_TYPE.treatment,
        params: { view: 'INBOUND_ACCEPTANCE_DETAILS' }
    },
    {
        id: 2,
        name: 'Process Sample',
        alias: 'PROCESS_SAMPLE',
        phaseId: 10,
        enablePageId: 10,
        url_slug: '/inventory/treatment/process?view=PROCESS_SAMPLE',
        url_type: URL_TYPE.treatment,
        params: { view: 'PROCESS_SAMPLE' }
    },
    {
        id: 3,
        name: 'Store sample',
        alias: 'STORE_SAMPLE',
        phaseId: 14,
        enablePageId: 14,
        url_slug: '',
        url_type: URL_TYPE.treatment,
        params: { view: 'STORE_SAMPLE' }
    },
]

export const QUARANTINE_RESOLUTION_PHASES = [
    {
        id: 1,
        name: 'Inbound Acceptance',
        alias: 'INBOUND_ACCEPTANCE_DETAILS',
        phaseId: 8,
        enablePageId: 5,
        url_slug: '/inventory/storage/quarantine/quarantineProcess?view=INBOUND_ACCEPTANCE_DETAILS',
        url_type: URL_TYPE.treatment,
        params: { view: 'INBOUND_ACCEPTANCE_DETAILS' }
    },
    {
        id: 2,
        name: 'Process Sample',
        alias: 'PROCESS_SAMPLE',
        phaseId: 10,
        enablePageId: 10,
        url_slug: '/inventory/storage/quarantine/quarantineProcess?view=PROCESS_SAMPLE',
        url_type: URL_TYPE.treatment,
        params: { view: 'PROCESS_SAMPLE' }
    },
    {
        id: 3,
        name: 'Store sample',
        alias: 'STORE_SAMPLE',
        phaseId: 14,
        enablePageId: 14,
        url_slug: '',
        url_type: URL_TYPE.treatment,
        params: { view: 'STORE_SAMPLE' }
    },
]

// These Phases has to bee changed for Smart_Lab_Demo_Purpose
export const SMART_LAB_TREATMENT_PENDING_PHASES = [
    {
        id: 1,
        name: 'Inbound Shipment',
        alias: 'INBOUND_SHIPMENT',
        phaseId: 8,
        enablePageId: 5,
        url_slug: '/inbound/samples/sampleStatusWiseList?view=INBOUND_ACCEPTANCE_DETAILS',
        url_type: URL_TYPE.patient,
        params: { view: 'INBOUND_SHIPMENT' }
    },
    {
        id: 2,
        name: 'Process Sample',
        alias: 'PROCESS_SAMPLE',
        phaseId: 10,
        enablePageId: 10,
        url_slug: '/inbound/samples/sampleStatusWiseList?view=PROCESS_SAMPLE',
        url_type: URL_TYPE.patient,
        params: { view: 'MANUFACTURER' }
    },
    {
        id: 3,
        name: 'Store Sample',
        alias: 'STORE_SAMPLE',
        phaseId: 14,
        enablePageId: 14,
        url_slug: '/inbound/samples/sampleStatusWiseList?inbound=true',
        url_type: URL_TYPE.treatment,
        params: { view: 'STORE_SAMPLE' }
    },
    // {
    //     id: 4,
    //     name: 'Outbound Process',
    //     alias: 'OUTBOUND_PROCESS',
    //     phaseId: 14,
    //     enablePageId: 14,
    //     url_slug: '/inventory/treatment/process/',
    //     url_type: URL_TYPE.treatment,
    //     params: { view: 'OUTBOUND_SHIPMENT' }
    // },
]

