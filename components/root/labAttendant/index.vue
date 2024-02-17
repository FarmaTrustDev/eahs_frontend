<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Lab Attendant Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
  
            <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/projects`, 16)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Projects</strong>
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