<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Customer Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
            <!-- <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/consent`, 12)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Consent</strong>
                </h4>
              </a>
            </div> -->
  
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/dashBoard-treatment.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/outbound/orderSummary`, 14)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Outbound</strong>
                </h4>
              </a>
            </div>
            
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