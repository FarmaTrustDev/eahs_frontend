<template>
  <a-layout class="layout">
    <div id="auth-container" class="main-container">
      <a-row type="flex" align="middle" class="min-vh-100">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" class="text-center">
          
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <Nuxt />
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>
