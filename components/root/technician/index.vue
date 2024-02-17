<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Technician Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
            <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/inbound/samples/form`, 14)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Sample Registration</strong>
                </h4>
              </a>
            </div>
            
          </a-col>
  
          <a-col :md="10">
            <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/task`, 13)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Task</strong>
                </h4>
              </a>
            </div>
  
            
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