<template>
  <a-layout class="layout">
    <div id="auth-container" class="main-container">
      <a-row type="flex" align="middle" class="min-vh-100">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="text-center">
          <img
            src="https://demoapi.qmaid.co/Logos/661e32e6-ec1c-425b-91e7-5d8d9a998742.png"
            alt="CGT"
          />
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <Nuxt />
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>
