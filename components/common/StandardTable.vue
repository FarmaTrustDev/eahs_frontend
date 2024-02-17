<template>
  <div>
    <a-table
      :loading="loading"
      :pagination="showPagination"
      :columns="columns"
      :data-source="shouldUpdate ? [...dumpData] : [...data]"
      class="rounded-table"
      :class="{ 'patient-table': patient }"
      @change="onChange"
    >
      <template slot="customTitle">
        <div class="text-left treatment-title">
          {{ translation['TreatStatu_2_748'] }}
        </div>
      </template>
      <template slot="pUIDRender" slot-scope="name, patient">
        <a-tooltip
          style="white-space: pre-line"
          :title="
            'PUID: ' +
            patient.enrollmentNumber + '\n'+
            patient.organizationData
          "
        >
          <span class="treatmentName">{{ patient.hospitalPUID }}</span>
        </a-tooltip>
      </template>
      <template slot="name" slot-scope="name">
        <strong>{{ name }}</strong>
      </template>

      <template slot="treatmentTypeNameRender" slot-scope="name, patient">
        <strong v-for="treatment in patient.treatments" :key="treatment.id">
          <a-tooltip :title="'TreatmentID: ' + treatment.treatmentPUID">
            <span class="treatmentName">{{ treatment.treatmentTypeName }}</span>
          </a-tooltip>
        </strong>
      </template>

      <template slot="image" slot-scope="src, record">
        <img
          width="50"
          class="img-responsive"
          :src="src"
          @click="clickImage(record)"
        />
      </template>
      <template slot="active" slot-scope="record">
        <span v-if="record">Accepted</span>
        <span v-else>New Changes Submitted</span>
      </template>
      <template slot="icon" slot-scope="icon, record">
        <a-icon type="cloud-upload" @click="clickIcon(record)" />
      </template>

      <template slot="popupOver" slot-scope="text">
        <a-popover>
          <template slot="content"> {{ text }} </template>
          <span type="primary"> {{ text }}</span>
        </a-popover>
      </template>

      <template slot="check" slot-scope="flag">
        <!-- <strong>{{ flag }}</strong> -->
        <!-- <a-icon
         
          type="check"
          two-tone-color="#52c41a"
          theme="twoTone"
        /> -->
        <a-icon
          v-if="flag"
          type="check"
          theme="outlined"
          :style="{ color: '#52c41a' }"
        />
        <a-icon
          v-else
          type="close-circle"
          two-tone-color="#eb2f96"
          theme="twoTone"
        />
      </template>

      <span
        slot="treatment_status"
        slot-scope="text, record"
        class="treatment-steps"
      >
        <!-- Steps with treatments -->
        <span
          v-for="treatment in record.treatments"
          :key="treatment.id"
          :class="getTreatmentStepClass(record, treatment)"
        >
          <div class="container-div">
            <div class="container-steps-div main">
              <div>
                <steps
                  :treatment="treatment"
                  :phases="phases"
                  :current-step="getCurrentStep"
                  :patient="record"
                  :goto-view="stepClick"
                ></steps>

                <span class="vertical-line-standard-table"></span>

                <a-dropdown>
                  <a-button type="primary" class="ant-btn-drop-down patient-btn-admin">
                    {{ translation['Admin_1_142'] }}<a-icon type="down" class="ml-5"/>
                  </a-button>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="gotoView(record, treatment)"
                        ><a-icon type="search" />
                        {{ translation.view_1_750 }}</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="handleCancelModal(true, record, treatment)"
                        ><a-icon type="minus-circle" />
                        {{
                          treatment.isHold
                            ? translation.Resum_1_463
                            : translation.Pause_1_452
                        }}</a
                      >
                    </a-menu-item>
                    <a-menu-item class="treatment-cancel-placeholder">
                      <a
                        href="javascript:;"
                        @click="cancelTreatment(record, treatment)"
                        ><a-icon type="minus-circle" />
                        {{
                          treatment.isCancel
                            ? 'continue'
                            : translation.cance_1_296
                        }}</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="handleDeleteModal(true, record, treatment)"
                        ><a-icon type="delete" />
                        {{ translation.Delet_1_451 }}</a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </div>
            <!-- <div class="container-drop-down-div">
              <span class="vertical-line-standard-table"></span>
              <a-dropdown>
                <a-button type="primary" class="ant-btn-drop-down">
                  {{ translation['Admin_1_142'] }}
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="gotoView(record, treatment)"
                      ><a-icon type="search" /> {{ translation.view_1_750 }}</a
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a
                      href="javascript:;"
                      @click="handleCancelModal(true, record, treatment)"
                      ><a-icon type="minus-circle" />
                      {{
                        treatment.isHold
                          ? translation.Resum_1_463
                          : translation.Pause_1_452
                      }}</a
                    >
                  </a-menu-item>
                  <a-menu-item class="treatment-cancel-placeholder">
                    <a
                      href="javascript:;"
                      @click="cancelTreatment(record, treatment)"
                      ><a-icon type="minus-circle" />
                      {{
                        treatment.isCancel
                          ? 'continue'
                          : translation.cance_1_296
                      }}</a
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a
                      href="javascript:;"
                      @click="handleDeleteModal(true, record, treatment)"
                      ><a-icon type="delete" /> {{ translation.Delet_1_451 }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div> -->
          </div>
        </span>
      </span>

      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="goto(`${actionLink}/${record.globalId}`)">
          <a-icon type="edit" />
        </a-button>
      </span>
      <span slot="btn" slot-scope="text, record">
        <a-button
          type="primary"
          @click="goto(`${actionLink}/${record.globalId}`)"
        >
          {{ buttonName }}
        </a-button>
      </span>
      <span slot="screeningId" slot-scope="text, record, index">
        {{index + 1}}
      </span>
      <span slot="upsertDropdown" slot-scope="text, record" class="manf-coll-admin-btn">
        <a-dropdown >
          <a-button class="action-button " @click="preventDefault">
            <!-- <b><a-icon type="more" /></b> -->
            {{ translation['Admin_1_142'] }} <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="clickUpdate(record)">
              <a-icon type="edit" />{{ translation.Updat_1_208 }}
            </a-menu-item>

            <a-menu-item key="3">
              <!-- <a-popconfirm
                title="Are you sure you want to delete this step ?"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="clickDelete(record)"
              > -->
              <span @click="stepDeleteModal(true, record)"><a-icon type="delete"  />{{
                translation.Delet_1_451
              }}
              </span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>

      <span slot="patientAction" slot-scope="text, record">
        <a-dropdown :trigger="['click']">
          <a-button class="action-button" @click="preventDefault">
            {{ translation['Suppo_1_33'] }} <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="handleSidebarKey(`/support?showModel=true`,4)">{{
                translation.OpenTicke_2_800
              }}</a>
            </a-menu-item>
            <a-menu-item key="Consent">
              <a
                @click="
                  goto(`/hospital/patients/${record.globalId}?view=Consent`)
                "
                >{{ translation.Addnew_3_75 }}</a
              >
            </a-menu-item>
            <a-menu-item key="3" @click="hidePatientModal(true, record.id)">
              <!-- <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="deletePatient(`${record.id}`)"
              >
              </a-popconfirm> -->
                {{ translation.HidePatie_2_804 }}
            </a-menu-item>
            <a-menu-item key="4" @click="patientDelete(true, record)">
              <!-- <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="deadPatient(record)"
              > -->
              <span v-if="record.isDead">
                {{ translation.Resum_1_463 }}</span
              >
              <span v-else >{{
                translation.cance_1_296
              }}</span>
              <!-- </a-popconfirm> -->
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>

      <!-- // filter option -->
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, column, clearFilters }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="() => handleSearch(selectedKeys, column)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, column)"
        >
          {{ translation.searc_1_488 }}
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters, column)"
        >
          {{ translation.Reset_1_464 }}
        </a-button>
      </div>

      <span v-if="isHospital" slot="nameTags" slot-scope="tags">
        <a-tag>{{ tags.name }}</a-tag>
      </span>

      <span v-else slot="nameTags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
      </span>
    </a-table>

    <!-- Todo cancel treatment modal (Remove patient table work) have to complete
    the sprint cannot segregate the patient -->
    <a-modal
      :visible="showCancelTreatmentModal"
      :title="cancelModalTitle"
      :footer="null"
      @cancel="handleCancelTreatmentModal(false)"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <!-- v-model="treatmentCancelReason" -->
          <a-textarea
            v-decorator="[
              'note',
              {
                initialValue: note,
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Enter Note"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :title="pauseModalTitle"
      :visible="showPauseModal"
      :footer="false"
      @cancel="handleCancelModal(false, '', '')"
    >
      <a-form ref="pauseForm" :form="form" @submit="handleOk">
        <!-- v-model="treatmentPauseReason" -->
        <a-form-item>
          <a-textarea
            v-decorator="[
              'notes',
              {
                initialValue: notes,
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Enter Note"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :visible="showFlagModal"
      @ok="handleFlagModal(true, '', '', true)"
      @cancel="handleFlagModal(false, patient, treatment, false)"
    >
      <p>
        Treatment is already in pause state, do you want to switch the status to
        cancel ?
      </p>
    </a-modal>
    <a-modal
      :visible="showDeleteModal"
      :footer="null"
      @cancel="deleteModal(false)"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
         <p>Are you sure you want to delete this treatment?</p>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="handleDeleteModal(false, '', '')"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            @click="deleteModal(false)"
          >
            Cancel
          </a-button>
        </footer></center>
    </a-modal>
     <a-modal
      :visible="patientHideModal"
      :footer="null"
      @cancel="hidePatientModal(false,'')"
      centered
    >
      <center>
         <h2>Are you sure you want to hide this patient permanently?</h2>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="hidePatient()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            
            @click="hidePatientModal(false,'')"
          >
            Cancel
          </a-button>
        </footer></center>
    </a-modal>
    <a-modal
      :visible="showPauseDeleteModal"
      @ok="handleModal()"
      @cancel="cancelModal(false)"
    >
      The treatment is already in cancel state. Do you want to switch the status
      to pause ?
      
    </a-modal>
    <a-modal
      :visible="patientDeleteModal"
      :footer="null"
      class="error-model"
      @cancel="patientDelete(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>
          Are you sure you want to delete this patient (
          {{ patientRecord.name }} ) ?
        </h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="patientDeleteMethod()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            @click="patientDelete(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
    </a-modal>
    <a-modal
      :visible="visibleDeleteModal"
      ok-text="OK"
      :footer="null"
      class="error-model"
      @cancel="stepDeleteModal(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>Are you sure you want to delete this step ?</h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="stepDelete()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            
            @click="stepDeleteModal(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
    </a-modal>
  </div>
</template>
<script>
// import {getImageUrl} from '~/mixins/images-helper'
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty, preventDefault } from '~/services/Helpers'
import steps from '~/components/common/Steps'
import { PATIENT_TREATMENT_PHASES } from '~/services/Constant/Phases'
import PatientServices from '~/services/API/PatientServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import paginationHelper from '~/mixins/pagination'
import filterOption from '~/mixins/filter-options'
// import { Modal } from 'ant-design-vue';
export default {
  components: { steps },
  mixins: [routeHelpers, notifications, paginationHelper, filterOption],
  props: {
    columns: { type: Array, default: () => [] },
    dumpData: { type: Array, default: () => [] },
    // eslint-disable-next-line vue/require-prop-types
    // pagination: { required: false, default: false },
    actionLink: { type: String, default: '' },
    buttonName: { type: String, default: '' },
    // eslint-disable-next-line vue/require-default-prop
    apiService: { type: Object, required: false },
    // eslint-disable-next-line vue/require-default-prop
    fetchFrom: { type: Function, required: false },
    params: { type: Object, default: () => ({}) },
    rounded: { type: Boolean, default: false },
    patient: { type: Boolean, default: false },
    shouldFetch: { type: Boolean, default: true },
    showPagination: { type: Boolean, default: true },
    shouldUpdate: { type: Boolean, default: false },
    isHospital: { type: Boolean, default: false },
    isManufacturer: { type: Boolean, default: false },
  },

  data() {
    return {
      data: [],
      recordData: [],
      patientData: [],
      visibleDeleteModal: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      showDeleteModal: false,
      showPauseModal: false,
      showFlagModal: false,
      phases: PATIENT_TREATMENT_PHASES,
      treatmentCancelReason: '',
      treatmentPauseReason: '',
      note: '',
      notes: '',
      showCancelTreatmentModal: false,
      deleteStep: {},
      treatmentForCancellation: {},
      treatmentForPause: {},
      showPauseDeleteModal: false,
      patientDeleteModal: false,
      patientRecord: '',
      cancelModalTitle: 'Cancel Treatment',
      pauseModalTitle: 'Pause Treatment',
      patientHideModal: false,
      patientId : '',
      current: 1,
      // pagination: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.phases[0].name = newValues.Scree_1_679
        this.phases[1].name = newValues.Sched_1_681
        this.phases[2].name = newValues.Colle_1_444
        this.phases[3].name = newValues.Shipm_1_756
        this.phases[4].name = newValues.Treat_1_29
        this.phases[5].name = newValues.Aftercare_2_638
      }
    },
  },
  mounted() {
    this.getTranslationData()
    if (this.shouldFetch) {
      this.fetch()
      this.getFetchMethod()
    } else {
      this.data = this.dumpData
    }
    if(localStorage.patient_list_current_page)
    {
      this.current = localStorage.patient_list_current_page
    }
  },
  methods: {
    onChange(current)
        {
            localStorage.setItem('patient_list_current_page',current.current)
        }, 
    hidePatientModal(e,record)
    {
      this.patientId = record
      this.patientHideModal = e
    },
    hidePatient()
    {
      this.patientHideModal = false
      this.deletePatient(this.patientId)
    },
    patientDeleteMethod() {
      this.deadPatient(this.patientRecord)
      this.patientDeleteModal = false
    },
    patientDelete(e, record) {
      this.patientRecord = record
      this.patientDeleteModal = e
    },
    stepDelete() {
      this.clickDelete(this.deleteStep)
      this.stepDeleteModal(false, '')
    },
    stepDeleteModal(e, step) {
      this.deleteStep = step
      this.visibleDeleteModal = e
    },
    preventDefault,
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.treatmentCancelReason = values.note
        if (!err) {
          // eslint-disable-next-line no-unused-expressions
          this.submitCancelResponse()
          this.handleCancelTreatmentModal(false)
        }
      })
    },
    getTranslationData() {
      this.phases[0].name = this.translation.Scree_1_679
      this.phases[1].name = this.translation.Sched_1_681
      this.phases[2].name = this.translation.Colle_1_444
      this.phases[3].name = this.translation.Shipm_1_756
      this.phases[4].name = this.translation.Treat_1_29
      this.phases[5].name = this.translation.Aftercare_2_638
    },
    handleOk(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.treatmentPauseReason = values.notes
        if (!err) {
          this.submitPauseResponse()
          this.showPauseModal = false
        }
      })
    },
    submitPauseResponse() {
      const treatment = this.treatmentForPause
      TreatmentServices.hold(treatment.globalId, !treatment.isHold, {
        notes: this.treatmentPauseReason,
      })
        .then((response) => {
          this.success('Status updated successfully')
          this.$emit('fetchParent', response)
        })
        .catch(this.error)
    },
    fetch(params = {}) {
      this.loading = true
      const fetchFrom = this.getDataApiService()
      fetchFrom({ ...this.params, ...this.pagination, ...params })
        .then((response) => {
          this.$emit('afterFetch', response)
          if (response.data && response.data.data) {
            this.data = response.data.data
            this.setPagination(response.data)
            this.pagination.current = this.current
          } else {
            this.setPagination(response.data)
            this.data = response.data
          }
        })
        .catch(this.error)
        .finally(() => {
          this.$emit('finally')
          this.loading = false
        })
    },
    getDataApiService() {
      return isEmpty(this.fetchFrom)
        ? this.isHospital
          ? this.apiService.getHospitalScreening
          : this.apiService.get
        : this.fetchFrom
    },
    getCurrentStep(treatment) {
      let currentPhase = 0
      // Most expensive Operation in whole application
      if (!isEmpty(treatment.phaseId)) {
        const phases = this.phases

        // check iif schedule is not set then return screening phase
        // if (treatment.isSchedule === false) {
        //   currentPhase = 2 // screening on Phases 2
        //   return currentPhase
        // }

        for (let phase = 0; phase < phases.length; phase++) {
          if (phases[phase].phaseId <= treatment.phaseId) {
            currentPhase = phases[phase].id
          } else {
            currentPhase = phases[phase].id
            break
          }
        }
        return currentPhase
      }
      return 1
    },
    gotoConsent(patient, treatment) {
      if (!isEmpty(patient))
        this.goto(`/hospital/patients/${patient.globalId}?view=Consent`, {
          treatment_id: treatment.globalId,
        })
    },
    stepClick(patient, treatment, phase) {
      // insane logic
      //  2 for patient
      // return false
      if (
        phase.id !== 1 &&
        (treatment.phaseId == null || treatment.phaseId < 2) &&
        treatment.phaseId < phase.phaseId
      ) {
        return false
      }
      const routeModel =
        phase.url_type === 1 ? patient.globalId : treatment.globalId
      return treatment.phaseId === 1
        ? this.gotoConsent(patient, treatment)
        : this.goto(`${phase.url_slug}${routeModel}`, {
            treatment_id: treatment.globalId,
            ...phase.params,
          })
    },
    gotoCollectionScreen(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/collection/${treatment.globalId}`, {
          treatment_id: treatment.globalId,
        })
      }
    },
    gotoView(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/treatment/${treatment.globalId}`)
      }
    },
    clickUpdate(record) {
      this.$emit('clickUpdate', record)
    },
    clickDelete(record) {
      this.$emit('clickDelete', record)
    },
    getFetchMethod() {
      this.$emit('getFetch', this.fetch)
    },
    deletePatient(record) {
      PatientServices.destroy(record).then((response) => {
        this.success(response.message)
        this.fetch()
      })
    },
    checkTreatment(record) {
      if (isEmpty(record.treatments)) {
        return true
      } else {
        return false
      }
    },
    handleFlagModal(e, patient, treatment, isHold) {
      // eslint-disable-next-line eqeqeq
      if (e == true && isHold == false) {
        this.patientData = patient
        this.recordData = treatment
        this.showFlagModal = e
      }
      // eslint-disable-next-line eqeqeq
      else if (e == true && isHold == true) {
        this.showFlagModal = false
        this.holdTreatment(this.patientData, this.recordData)
        this.recordData.isHold = false
        this.cancelTreatment(this.patientData, this.recordData)
      }
      // eslint-disable-next-line eqeqeq
      else if (e == false && isHold == false) {
        this.showFlagModal = false
      }
    },
    deadPatient(patient) {
      const isDead = !patient.isDead
      TreatmentServices.markDead(patient.globalId, isDead).then((response) => {
        this.$emit('fetchParent', response)
      })
    },
    clickImage(record) {
      this.$emit('clickImage', record)
    },
    clickIcon(record) {
      this.$emit('clickIcon', record)
    },
    handleCancelTreatmentModal(show) {
      this.showCancelTreatmentModal = show
    },
    submitCancelResponse() {
      /// ANy how need to optimize on high priority
      const treatment = this.treatmentForCancellation
      this.loading = true
      TreatmentServices.cancel(treatment.globalId, !treatment.isCancel, {
        notes: this.treatmentCancelReason,
      })
        .then((response) => {
          this.handleCancelTreatmentModal(false)
          // this.success(response.message)
          this.success('Status updated successfully')
          this.$emit('fetchParent', response)
        })
        .catch(this.error)
        .finally(() => (this.loading = true))
    },

    cancelTreatment(patient, treatment) {
      this.cancelModalTitle = treatment.isCancel
        ? 'Continue Treatment'
        : 'Cancel Treatment'
      if (treatment.isHold === true) {
        this.handleFlagModal(true, patient, treatment, false)
      } else {
        this.treatmentForCancellation = treatment
        this.handleCancelTreatmentModal(true)
      }
    },
    holdTreatment(patient, treatment) {
      TreatmentServices.hold(treatment.globalId, !treatment.isHold, {
        notes: this.treatmentPauseReason,
      })
        .then((response) => {
          this.success('Status updated successfully')
          this.$emit('fetchParent', response)
        })
        .catch(this.error)
    },
    getTreatmentStepClass(patient, treatment) {
      if (patient.isDead) {
        return 'dead'
      } else if (treatment.isHold) {
        return 'hold'
      } else if (treatment.isCancel) {
        return 'cancel'
      }
    },
    getPagination() {
      if (!this.showPagination) {
        return false
      }
      return this.pagination
    },
    deleteTreatment(e, patient, treatment) {
      TreatmentServices.destroy(treatment.id).then((response) => {
        this.success('Treatment has been deleted.')
        this.fetch()
      })
    },
    handleDeleteModal(e, patient, treatment) {
      // eslint-disable-next-line eqeqeq
      if (e == true) {
        this.patientData = patient
        this.recordData = treatment
        this.deleteModal(e)
      }
      // eslint-disable-next-line eqeqeq
      else if (e == false) {
        this.deleteTreatment(e, this.patientData, this.recordData)
        this.deleteModal(e)
      }
    },
    deleteModal(e) {
      this.showDeleteModal = e
    },
    handleCancelModal(e, record, treatment) {
      this.patientData = record
      this.recordData = treatment
      this.pauseModalTitle = treatment.isHold
        ? 'Resume Treatment'
        : 'Pause Treatment'
      this.treatmentForPause = treatment
      // eslint-disable-next-line eqeqeq
      if (this.recordData.isCancel == true) {
        this.cancelModal(true)
      } else {
        this.showPauseModal = e
      }
    },
    handleModal() {
      this.cancelTreatment(this.patientData, this.recordData)
      this.handleCancelTreatmentModal(false)
      this.treatmentForCancellation = this.recordData
      this.submitCancelResponse()
      this.showPauseModal = true
      this.cancelModal(false)
    },
    cancelModal(e) {
      this.showPauseDeleteModal = e
    },
  },
}
</script>
<style scoped>
.patient-btn-admin {
  height: 36px;
    width: 77px;
    border-radius: 15px;
    font-size: 12px;
}
</style>