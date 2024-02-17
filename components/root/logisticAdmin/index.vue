<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Admin Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/courierService`, 2)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Service</strong>
                </h4>
              </a>
            </div>
            <!-- <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/Chat`, 6)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Chat</strong>
                </h4>
              </a>
            </div> -->
          </a-col>
          <a-col :md="10">
            <!-- <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/Support`, 7)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Support</strong>
                </h4>
              </a>
            </div> -->
            <div class="home-tab">
              <img
                      src="	https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/users`, 11)"
              >
                <h4 class="heading-home">
                  <strong class="strong">User</strong>
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