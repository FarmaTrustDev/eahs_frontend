<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Admin Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
            
            <a
                href="javascript:;"
                @click="handleSidebarKey(`/inbound/samples`, 13)"
              >
              <div class="home-tab">
                <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
                  <h4 class="heading-home">
                    <strong class="strong">Sample</strong>
                  </h4>
              </div>
          </a>
          <a href="javascript:;"
              @click="handleSidebarKey(`/outbound/orderSummary`, 14)"
            >
              <div class="home-tab">
                <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/dashBoard-treatment.svg"
                      width="120"
                      height="100"
                    />
                <h4 class="heading-home">
                  <strong class="strong">Outbound</strong>
                </h4>
              </div>
          </a>
          
          </a-col>
  
          <a-col :md="10">
            
          <!-- <a
            href="javascript:;"
            @click="handleSidebarKey(`/inventory`, 15)"
          >
              <div class="home-tab">
                <h4 class="heading-home">
                  <strong class="strong"> Inventory </strong>
                </h4>
              </div>
          </a> -->
          
          </a-col>
          <a-col :md="10">
            <a
                href="javascript:;"
                @click="handleSidebarKey(`/users`, 11)"
              >
            <div class="home-tab">
              <img
                      src="	https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                <h4 class="heading-home">
                  <strong class="strong"> Users </strong>
                </h4>
              
            </div>
          </a>
          <a
                href="javascript:;"
                @click="handleSidebarKey(`/donor/detail`, 17)"
              >
            <div class="home-tab">
              <img
                      src="	https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                <h4 class="heading-home">
                  <strong class="strong"> Donor/Patient </strong>
                </h4>
              
            </div>
          </a>
          </a-col>
          <a-col :md="10">
            
          </a-col>
        </a-row>
      </a-card>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  export default({
    mixins:[routeHelpers]
  })
  </script>