import { setUserDetails } from '~/services/Auth'
import UserService from '~/services/API/UserServices'
export default {
    methods: {
        getUserDetails() {
            UserService.detail()
                .then((user) => {
                    setUserDetails(user)
                    this.$store.commit('setUser', user)
                })
                .then(() => {
                    // this.$router.go()
                })
        },
        isSuperAdmin()
        {
            const user = this.getStoreUserDetails();
            return user.roleName === "SUPER_ADMIN_TYPE";
        },
        isAdmin()
        {
            const user = this.getStoreUserDetails();
            return user.roleName === "ADMIN_TYPE" && user.organizationTypeAlias === "BIOBANK";
        },
        isDonor()
        {
            const user = this.getStoreUserDetails();
            return user.roleName === "DONOR_TYPE";
        },
        isLabAttendant(){
            const user = this.getStoreUserDetails()
            return user.roleName === "LAB_ATTENDANT_TYPE";
        },
        isResearcher(){
            const user = this.getStoreUserDetails()
            return user.roleName === "RESEARCHER_TYPE"
        },
        isNurse(){
            const user = this.getStoreUserDetails()
            return user.roleName === "NURSE_TYPE"
        },
        isCustomer(){
            const user = this.getStoreUserDetails()
            return user.roleName === "CUSTOMER_TYPE"
        },
        isPrincipleInvestigator(){
            const user = this.getStoreUserDetails()
            return user.roleName === "PRINCIPLE_INVESTIGATOR_TYPE"
        },
        isTechnician(){
            const user = this.getStoreUserDetails()
            return user.roleName === "TECHNICIAN_TYPE"
        },
        isPartner(){
            const user = this.getStoreUserDetails()
            return user.roleName === "PARTNER_TYPE"
        },
        isManager(){
            const user = this.getStoreUserDetails()
            return user.roleName === "MANAGER_TYPE"
        },
        isClient(){
            const user = this.getStoreUserDetails()
            return user.roleName === "CLIENT_TYPE"
        },
        isManufacturer(){
            const user = this.getStoreUserDetails()
            return user.roleName === "MANUFACTURER_TYPE"
        },
        isCustodian(){
            const user = this.getStoreUserDetails()
            return user.roleName === "CUSTODIAN_TYPE"
        },
        isPatient(){
            const user = this.getStoreUserDetails()
            return user.roleName === "PATIENT_TYPE"
        },
        isInstituteAdmin(){
            const user = this.getStoreUserDetails()
            return user.roleName === "INSTITUTE_ADMIN"
        },
        isLogisticAdmin(){
            const user = this.getStoreUserDetails()
            return user.roleName === "ADMIN_TYPE" && user.organizationTypeAlias === "COURIER"
        },
        getStoreUserDetails() {
            return this.$store.getters.getUser
        },
        isInstituteCustomer(){
            const user = this.getStoreUserDetails()
            return user.roleName === "INSTITUTE_CUSTOMER_TYPE"
        }
    },
}
