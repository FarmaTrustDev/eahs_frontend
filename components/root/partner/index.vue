<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Partner Dashboard</strong>
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
                  <strong class="strong">Project</strong>
                </h4>
              </a>
            </div>
            <!-- <div class="home-tab">
                <a
                href="javascript:;"
                @click="handleSidebarKey(`/inventory`, 15)"
                >
                <h4 class="heading-home">
                  <strong class="strong">Inventory</strong>
                </h4>
                </a>
            </div> -->
            <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/support`, 7)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Support</strong>
                </h4>
              </a>
            </div>
          </a-col>
  
          <a-col :md="10">
            <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/chat`, 6)"
              >
                <h4 class="heading-home">
                  <strong class="strong"> Chat </strong>
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