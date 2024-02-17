export const BASE_URL = process.env.baseUrl
export const BASE_API = process.env.api

export const STATUSES = [
  {
    id: 1,
    name: 'Booked',
    bg_color: '#e8f1ff',
  },
  {
    id: 2,
    name: 'Travelling',
    bg_color: '#80008061',
  },
  {
    id: 3,
    name: 'Arrived',
    bg_color: '#ffa50069',
  },
  {
    id: 4,
    name: 'Accepted',
    bg_color: '#f4fff1',
  },
  {
    id: 5,
    name: 'Entered',
    bg_color: '#f4fff1',
  },
  {
    id: 6,
    name: 'Completed',
    bg_color: '#f8f8f8',
  },
  {
    id: 7,
    name: 'Cancelled',
    bg_color: '#ffdbd0',
  },
]

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export const GENDER = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
]

export const HOSPITAL_ALIAS = 'HOSPITAL'
export const LOGISTIC_ALIAS = 'LOGISTIC'
export const MANUFACTURER_ALIAS = 'MANUFACTURER'
export const SUPERADMIN_ALIAS =  'ADMIN'
export const SMARTLAB_ALIAS = 'SMARTLAB'

export const CONSENT_STATUSES = {
  accept : { id : 1, name : 'Accepted'},
  pending: { id : 2, name : 'Pending'},
  reject:{ id : 3, name : 'Rejected'},
  withdraw:{ id : 4, name : 'Withdrawn'},
  withdraw24Hours: { id : 5, name : 'Withdraw for 24 hours'},
  incomplete: { id : 6, name : 'Incomplete'},
  approved: { id : 7, name : 'Approved'}
}
export const STEP_OPTION ={
  storage : {id:1,name:'IsStorage',description:'Storage Sample'},
  process : {id:2,name:'IsProcess',description:'Process Sample'},
  sampleKit: {id:3,name:'IsSampleKit',description:'Outbound Sample'},
  view: { id:4,name:'View',description:'View Sample'}
}

export const USER_ROLES = {
  admin_type : { name : 'ADMIN_TYPE',role:'Admin'},
  nurse_type: { name : 'NURSE_TYPE',role:'Nurse'},
  researcher_type:{  name : 'RESEARCHER_TYPE',role:'Researcher'},
  lab_attendant_type:{  name : 'LAB_ATTENDANT_TYPE',role:'Lab Attendant'},
  institute_customer_type:{name : 'INSTITUTE_CUSTOMER_TYPE',role:'Customer'},
  institute_admin:{name:'INSTITUTE_ADMIN',role:'Institute Admin'},
  manager_type:{name:'MANAGER_TYPE',role:'Manager'},
  principle_investigator:{name:'PRINCIPLE_INVESTIGATOR_TYPE',role:'Principle Investigator'}

}

export const CART_STATUSES = {
  checkedOut : { id : 1, name : 'CheckedOut'},
  pending: { id : 2, name : 'Pending'},
}

export const DOCUMENT_STATUSES = [
  {
    value: 'Accepted',
    displayValue: 'Accepted',
    component: 'a-button',
    action: 'visibleModal',
    description: 'The document has been accepted. You can see document info on clicking document name'
  },
  {
    value: 'Pending',
    displayValue: 'Pending',
    component: 'span',
    description: 'The document is in pending state. You can Accept or Reject it on clicking document name'
  },
  {
    value: 'Rejected',
    displayValue: 'Rejected',
    component: 'span',
    description: 'The document has been rejected. You can see document info on clicking document name'
  },
  {
    value: 'Withdrawn',
    displayValue: 'Withdrawn',
    component: 'span',
    description: 'The document has been withdrawn. You can see document info on clicking document name'
  },
  {
    value: 'Withdraw for 24 hours',
    displayValue: 'Withdrawn for 24 hours',
    component: 'button',
    action: 'visibleModal',
    description: 'The document has been withdrawn for 24 hours. You can permanently withdraw on click the status.'
  }
]

export const SCHEDULING_STATUSES = {
  new: { id: 1, name: 'New' },
  accepted: { id: 2, name: 'Accepted' },
  rejected: { id: 3, name: 'Rejected' },
  pending: { id: 4, name: 'Pending' },
  completed: { id: 5, name: 'Completed' },
  inProcess: { id: 6, name: 'InProcess' },
}

export const COLLECTION_TYPE = {
  hospital: { id: 1, name: 'Hospital' },
  manufacturer: { id: 2, name: 'Manufacturer' },
  treatment: { id: 3, name: 'Treatment' },
}

export const PICTURE_UPLOAD_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.bmp',
  '.gif',
  '.png',
  '.svg',
]
export const DOCUMENT_UPLOAD_EXTENSIONS = ['.doc', '.docx', '.pdf']
export const DOCUMENT_EXTENSIONS = [
  ...PICTURE_UPLOAD_EXTENSIONS,
  ...DOCUMENT_UPLOAD_EXTENSIONS,
]

export const QUARANTINE_STORAGE = "QUARANTINE_STORAGE"