<template>
  <div class="advance-receipt container">
    <h1 class="title">Advanced Receipt Notice</h1>
    <div class="d-flex status-main">
      <h2 class="">Status:</h2>
      <span class="status completed">Completed</span>
    </div>
    <a-row>
      <a-col :md="6">Client ID: a number</a-col>
      <a-col :md="6">ARN #: ARN-0633-003</a-col>
      <a-col :md="6">Project: Texas Test Project</a-col>
      <a-col :md="6">Created on: 27/06/2022</a-col>
    </a-row>
    <a-row>
      <a-col :md="6">Project ID: 123456a</a-col>
      <a-col :md="6">Created by: Amy Hendricks</a-col>
      <a-col :md="6">Protocol: Kiet Test</a-col>
      <a-col :md="6">Location: Cryoport - Houston</a-col>
    </a-row>
    <a-row>
      <a-col :md="6">Protocol ID: T1</a-col>
      <a-col :md="6">Client: Test Client</a-col>
      <a-col :md="6">Description: Test Client Receipt</a-col>
    </a-row>
    <hr />
    <a-row>
      <a-col :md="12">
        <a-form-item> <a-input placeholder="test" /> </a-form-item></a-col
    ></a-row>
  </div>
</template>
