import type { TripApi } from "../../types/dashboard/trip_type"
import type { Vehicle } from "../../types/live/list_type"
import type { Alarm } from "../../types/alarm/aconfig_type"
import type { TripTrailResponse, VehicleTrailResponse } from "../../types/trail/trail_type"

const now = new Date("2026-02-16T09:42:00Z")

export const polarDemoVehicles: Vehicle[] = [
  {
    id: "SNOW-14",
    vehicleNumber: "SNOW-14",
    deviceName: "Bharati traverse unit",
    speed: 18,
    address: "Bharati Station traverse route",
    altitude: "142 m",
    gpsTime: now.toISOString(),
    gprsTime: now.toISOString(),
    type: "Snow Vehicle",
    status: "Active",
    distance: "184 km",
    todayDistance: "38 km",
    gpsPing: "12 sec ago",
    drivers: "Field Team Alpha",
    rfid: "POL-RFID-014",
    tag: "Expedition 46",
    gpsStatus: "Online",
    gprsStatus: "Online",
    lastAlarm: "None",
    ignitionStatus: "On",
    sensor: "Nominal",
    power: "External",
    battery: "96%",
    ac: "On",
    lockStatus: "Secured",
    domainName: "Bharati",
    driverName: "Rahul Sharma",
    driverMobile: "+91 98XXXXXX14",
    gpsType: "PolarTrack P5",
    shipmentId: "POL-46-124",
    shipmentSource: "Bharati Logistics",
    vendorName: "NCPOR Fleet",
    group: ["Antarctic vehicles"],
    hasSpeedChart: true,
    lat: -69.406,
    lng: 76.188,
    trip_status: "in_transit",
    lastgpstime: now.toISOString(),
    digitalInput1: true,
  },
  {
    id: "SNOW-09",
    vehicleNumber: "SNOW-09",
    deviceName: "Maitri supply hauler",
    speed: 0,
    address: "Maitri Research Station yard",
    altitude: "105 m",
    gpsTime: now.toISOString(),
    gprsTime: now.toISOString(),
    type: "Snow Vehicle",
    status: "No Update",
    distance: "96 km",
    todayDistance: "0 km",
    gpsPing: "18 min ago",
    drivers: "Station Operations",
    rfid: "POL-RFID-009",
    tag: "Expedition 46",
    gpsStatus: "Intermittent",
    gprsStatus: "Online",
    lastAlarm: "Stoppage",
    ignitionStatus: "Off",
    sensor: "Nominal",
    power: "External",
    battery: "88%",
    ac: "Off",
    lockStatus: "Secured",
    domainName: "Maitri",
    driverName: "Station crew",
    driverMobile: "+91 98XXXXXX09",
    gpsType: "PolarTrack P5",
    shipmentId: "POL-46-115",
    shipmentSource: "Maitri Resupply",
    vendorName: "NCPOR Fleet",
    group: ["Antarctic vehicles"],
    hasSpeedChart: true,
    lat: -70.765,
    lng: 11.733,
    trip_status: "at_stop_delivery",
    lastgpstime: now.toISOString(),
    digitalInput1: false,
  },
  {
    id: "SNOW-03",
    vehicleNumber: "SNOW-03",
    deviceName: "Himadri field rover",
    speed: 0,
    address: "Himadri Research Station perimeter",
    altitude: "35 m",
    gpsTime: now.toISOString(),
    gprsTime: now.toISOString(),
    type: "Snow Vehicle",
    status: "Active",
    distance: "412 km",
    todayDistance: "12 km",
    gpsPing: "33 sec ago",
    drivers: "Arctic Science Team",
    rfid: "POL-RFID-003",
    tag: "Expedition 46",
    gpsStatus: "Online",
    gprsStatus: "Online",
    lastAlarm: "Weather watch",
    ignitionStatus: "Off",
    sensor: "Nominal",
    power: "External",
    battery: "91%",
    ac: "On",
    lockStatus: "Secured",
    domainName: "Himadri",
    driverName: "Science team Bravo",
    driverMobile: "+91 98XXXXXX03",
    gpsType: "PolarTrack P5",
    shipmentId: "POL-46-119",
    shipmentSource: "Himadri Science",
    vendorName: "NCPOR Fleet",
    group: ["Arctic vehicles"],
    hasSpeedChart: true,
    lat: 79.0,
    lng: 12.0,
    trip_status: "at_stop_pickup",
    lastgpstime: now.toISOString(),
    digitalInput1: false,
  },
]

export const polarDemoTrips: TripApi[] = polarDemoVehicles.map((vehicle, index) => ({
  id: `POL-46-${124 - index * 5}`,
  route_Name: index === 0 ? "Goa → Cape Town → Bharati" : index === 1 ? "Goa → Maitri Station" : "Himadri perimeter traverse",
  Domain_Name: "Indian Antarctic Expedition 46",
  Start_Time: "2026-02-14T06:30:00Z",
  End_Time: "",
  driverName: vehicle.driverName,
  driverMobile: vehicle.driverMobile,
  serviceProviderAlias: "NCPOR Logistics",
  Vehicle_number: vehicle.vehicleNumber,
  vehicle_type: vehicle.type,
  vehicle_groups: [{ group_id: 46, group_name: vehicle.group[0] }],
  cuurent_location_address: vehicle.address,
  current_location_coordindates: [vehicle.lat, vehicle.lng],
  last_gps_ping: vehicle.lastgpstime,
  shipment_source: vehicle.shipmentSource,
  gps_type: vehicle.gpsType,
  gps_unit_id: vehicle.id,
  gps_vendor: vehicle.vendorName,
  gps_frequency: "30 sec",
  total_distance: vehicle.distance,
  total_covered_distance: vehicle.todayDistance,
  status: vehicle.trip_status,
  origin: index === 0 ? "Goa Logistics Hub" : "Bharati Research Station",
  destination: index === 0 ? "Bharati Research Station" : vehicle.domainName,
  origin_coordinates: [15.49, 73.83],
  destination_coordinates: [vehicle.lat, vehicle.lng],
  ceta: index === 0 ? "18 Feb 2026, 14:00" : "16 Feb 2026, 18:30",
  geta: index === 0 ? "18 Feb 2026, 18:20" : "16 Feb 2026, 19:10",
  alert_counts_by_type: { stoppage: { active: index === 1 ? 1 : 0, inactive: 0 } },
  Vehicle_status: vehicle.status,
  status_duration: index === 1 ? "01h 18m" : "00h 42m",
  total_detention_time: index === 1 ? "00h 18m" : "00h 00m",
  total_drive_time: "08h 24m",
  total_stoppage_time: index === 1 ? "01h 18m" : "00h 24m",
  planned_stops: [],
  last_gps_vendor: vehicle.vendorName,
  total_time: "18h 40m",
  average_distance: "22 km/h",
}))

export const polarDemoAlerts = [
  { id: 1, shipment_id: "POL-46-124", alert_type_name: "Route Deviation", severity_type: "Warning", alert_description: "RV Sagar Nidhi is 18 nautical miles south of the planned corridor.", status_text: "Active", created_at: "2026-02-16T09:18:00Z", vehicle_number: "RV SAGAR NIDHI" },
  { id: 2, shipment_id: "POL-46-119", alert_type_name: "Weather Watch", severity_type: "Critical", alert_description: "Visibility window closing near Maitri Station. Review aircraft movement plan.", status_text: "Active", created_at: "2026-02-16T08:31:00Z", vehicle_number: "IL-76 AIR-07" },
  { id: 3, shipment_id: "POL-46-115", alert_type_name: "Reached Stop", severity_type: "General", alert_description: "Medical resupply received and checked at Maitri Station.", status_text: "Resolved", created_at: "2026-02-16T07:54:00Z", vehicle_number: "SNOW-09" },
]

export const polarDemoAlarms: Alarm[] = [
  { id: "ALM-POL-001", type: "Route Deviation", severityType: "Warning", description: "Research vessel outside planned southern ocean corridor", assignedTo: "Expedition Control", createdOn: "2026-02-16T09:18:00Z", updatedOn: null, alarmGeneration: "Conditional", enableGeofence: true, groups: ["Antarctic vessels"], email: "ops@ncpor.gov.in", sms: "+91 98XXXXXX10", thresholdValue: "18", status: "Active", vehicleGroups: [46], customerGroups: [], geofenceGroups: [2] },
  { id: "ALM-POL-002", type: "No GPS Feed", severityType: "Critical", description: "Aircraft transponder signal lost during weather window", assignedTo: "Air Operations", createdOn: "2026-02-16T08:31:00Z", updatedOn: null, alarmGeneration: "Always", enableGeofence: false, groups: ["Aircraft"], email: "airops@ncpor.gov.in", sms: "+91 98XXXXXX11", thresholdValue: "15", status: "Active", vehicleGroups: [47], customerGroups: [], geofenceGroups: [] },
  { id: "ALM-POL-003", type: "Stoppage", severityType: "General", description: "Snow vehicle stopped at Maitri supply yard", assignedTo: "Station Operations", createdOn: "2026-02-16T07:54:00Z", updatedOn: null, alarmGeneration: "Conditional", enableGeofence: true, groups: ["Antarctic vehicles"], email: "maitri@ncpor.gov.in", sms: "+91 98XXXXXX09", thresholdValue: "30", status: "Inactive", vehicleGroups: [49], customerGroups: [], geofenceGroups: [3] },
]

const trailPoints = Array.from({ length: 8 }, (_, index) => {
  const hour = String(8 + index).padStart(2, "0")
  const timestamp = Date.parse(`2026-02-16T${hour}:00:00Z`)
  return {
  id: index + 1,
  timestamp,
  time: `2026-02-16T${hour}:00:00Z`,
  address: index < 4 ? "Bharati Station traverse route" : "Bharati coastal approach",
  latitude: -69.406 + index * 0.018,
  longitude: 76.188 + index * 0.027,
  speed: index === 5 ? 0 : 14 + index,
  heading: 118,
  gpstimestamp: timestamp,
  gprstime: `2026-02-16T${hour}:00:00Z`,
  }
})

export const polarDemoVehicleTrail: VehicleTrailResponse = {
  vehicleNumber: "SNOW-14",
  vehicleId: "SNOW-14",
  totalPoints: trailPoints.length,
  dateRange: { startTime: "2026-02-16T08:00:00Z", endTime: "2026-02-16T15:00:00Z" },
  trailPoints,
  metrics: { totalTime: 25200, totalTimeFormatted: "07h 00m", avgSpeed: 18, totalDistance: 184 },
}

export const polarDemoTripTrail: TripTrailResponse = {
  shipmentId: "POL-46-124",
  routeName: "Goa Logistics Hub → Cape Town → Bharati Station",
  vehicleNumber: "SNOW-14",
  driverName: "Rahul Sharma",
  driverMobile: "+91 98XXXXXX14",
  status: "In Transit",
  startLocation: "Goa Logistics Hub",
  endLocation: "Bharati Research Station",
  totalDistance: "184 km",
  stops: [
    { id: 1, locationId: "GOA", stopName: "Goa Logistics Hub", stopType: "Origin", latitude: 15.49, longitude: 73.83, address: "Goa Logistics Hub", plannedSequence: 1, actualSequence: 1, entryTime: "2026-02-14T06:30:00Z", exitTime: "2026-02-14T08:00:00Z", geoFenceRadius: 1000, status: "Completed", customerName: "NCPOR Logistics", lrNumber: "POL-46-124" },
    { id: 2, locationId: "CPT", stopName: "Cape Town Gateway", stopType: "Port", latitude: -33.92, longitude: 18.42, address: "Cape Town Logistics Gateway", plannedSequence: 2, actualSequence: 2, entryTime: "2026-02-15T09:00:00Z", exitTime: "2026-02-15T15:00:00Z", geoFenceRadius: 1000, status: "Completed", customerName: "Oceanic Research Logistics", lrNumber: "POL-46-124" },
    { id: 3, locationId: "BHR", stopName: "Bharati Research Station", stopType: "Destination", latitude: -69.406, longitude: 76.188, address: "Bharati Research Station", plannedSequence: 3, actualSequence: 3, entryTime: null, exitTime: null, geoFenceRadius: 1200, status: "In Transit", customerName: "Bharati Research Station", lrNumber: "POL-46-124" },
  ],
  trailPoints,
  metrics: { totalTime: 25200, totalTimeFormatted: "07h 00m", avgSpeed: 18, totalDistance: 184 },
}

export const polarDemoGroups = [
  { id: 46, name: "Antarctic Vehicles", entityIds: [101, 102, 103], createdOn: "2026-01-04", updatedOn: "2026-02-16" },
  { id: 47, name: "Research Vessels", entityIds: [201, 202], createdOn: "2026-01-05", updatedOn: "2026-02-16" },
  { id: 48, name: "Station Aircraft", entityIds: [301], createdOn: "2026-01-06", updatedOn: "2026-02-16" },
]

export const polarDemoVendors = [
  { id: 101, name: "NCPOR Fleet Operations", active: true, createdAt: "2026-01-04", updatedAt: "2026-02-16" },
  { id: 102, name: "Polar Aviation Services", active: true, createdAt: "2026-01-05", updatedAt: "2026-02-16" },
  { id: 103, name: "Oceanic Research Logistics", active: true, createdAt: "2026-01-06", updatedAt: "2026-02-16" },
]

export const polarDemoEntities = [
  { id: 101, vehicleNumber: "SNOW-14", vendors: [{ id: 101, name: "NCPOR Fleet Operations", status: true }], type: "Truck" as const, status: true, createdAt: "2026-01-04", updatedAt: "2026-02-16" },
  { id: 102, vehicleNumber: "RV-SAGAR-NIDHI", vendors: [{ id: 103, name: "Oceanic Research Logistics", status: true }], type: "Research Vessel" as const, status: true, createdAt: "2026-01-05", updatedAt: "2026-02-16" },
  { id: 103, vehicleNumber: "AIR-07", vendors: [{ id: 102, name: "Polar Aviation Services", status: true }], type: "Aircraft" as const, status: true, createdAt: "2026-01-06", updatedAt: "2026-02-16" },
]

export const polarDemoCustomerGroups = [
  { id: 21, group_name: "Bharati Research Station", customerIds: [201, 202], created_at: "2026-01-04", updated_at: "2026-02-16" },
  { id: 22, group_name: "Maitri Research Station", customerIds: [203], created_at: "2026-01-05", updated_at: "2026-02-16" },
  { id: 23, group_name: "Himadri Research Station", customerIds: [204], created_at: "2026-01-06", updated_at: "2026-02-16" },
]

export const polarDemoGeofenceGroups = [
  { id: 31, geo_group: "Antarctic Station Perimeters", geofenceIds: [401, 402], created_at: "2026-01-04", updated_at: "2026-02-16", geofences: [] },
  { id: 32, geo_group: "Southern Ocean Corridors", geofenceIds: [403], created_at: "2026-01-05", updated_at: "2026-02-16", geofences: [] },
]

export const polarDemoGeofences = [
  { id: 401, geofence_name: "Bharati Station perimeter", type: "circle" as const, radius: 1200, coordinates: { lat: -69.406, lng: 76.188 }, location_id: "BHARATI", tag: "Research station", stop_type: "Station", status: true, geofence_type: 0, latitude: -69.406, longitude: 76.188, address: "Bharati Research Station" },
  { id: 402, geofence_name: "Maitri Station perimeter", type: "circle" as const, radius: 1000, coordinates: { lat: -70.765, lng: 11.733 }, location_id: "MAITRI", tag: "Research station", stop_type: "Station", status: true, geofence_type: 0, latitude: -70.765, longitude: 11.733, address: "Maitri Research Station" },
  { id: 403, geofence_name: "Sagar Nidhi corridor", type: "polygon" as const, coordinates: { lat: -60.2, lng: 48.7 }, tag: "Cargo corridor", stop_type: "Route", status: true, geofence_type: 2, latitude: -60.2, longitude: 48.7, address: "Southern Ocean route" },
]

export const polarDemoUsers = [
  { id: 2, name: "Dr. Rahul Sharma", phone: "9810000014", email: "rahul.sharma@ncpor.gov.in", username: "rahul.sharma", password: "", active: true, role: "Field Scientist", tag: "Expedition 46", userTypes: ["Driver"], vehicleGroups: ["Antarctic Vehicles"], geofenceGroups: ["Antarctic Station Perimeters"], customerGroups: ["Bharati Research Station"] },
  { id: 3, name: "Ananya Iyer", phone: "9810000021", email: "ananya.iyer@moes.gov.in", username: "ananya.iyer", password: "", active: true, role: "Expedition Coordinator", tag: "Command", userTypes: ["Admin"], vehicleGroups: [], geofenceGroups: ["Antarctic Station Perimeters"], customerGroups: ["Bharati Research Station", "Maitri Research Station"] },
  { id: 4, name: "Vikram Nair", phone: "9810000033", email: "vikram.nair@ncpor.gov.in", username: "vikram.nair", password: "", active: true, role: "Logistics Officer", tag: "Cargo", userTypes: ["Customer"], vehicleGroups: ["Research Vessels"], geofenceGroups: ["Southern Ocean Corridors"], customerGroups: ["Maitri Research Station"] },
]
