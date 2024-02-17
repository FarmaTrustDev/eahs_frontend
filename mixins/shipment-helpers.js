import { isEmpty } from '~/services/Utilities'
export default {
  methods: {
    markShipmentFlags() {
      const schedule = this.schedule

      if (!isEmpty(schedule)) {
        schedule.shipments.forEach((shipment) => {
          if (!isEmpty(shipment.pickupAt)) {
            this.pickupShipment = shipment
          }
          if (!isEmpty(shipment.deliveryAt)) {
            this.deliveryShipment = shipment
          }
        })
      }
    },
  },
}
