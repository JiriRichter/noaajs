export enum StationType {
    waterlevels =  'waterlevels', // Stations that actively measure water levels
    historicwl =  'historicwl', // Stations that have measured water levels in the past. This includes active stations.
    met =  'met', // Stations that have one or more meteorological sensors installed, such as air temperature.
    waterlevelsandmet =  'waterlevelsandmet', // Combined results of waterlevels and met types. Results in a list of active stations, excluding current meters.
    tidepredictions =  'tidepredictions', // Stations that offer tide predictions based on harmonic analysis.
    harcon =  'harcon', // Water level stations with measured harmonic constituents.
    datums =  'datums', // Water level stations with datums.
    supersededdatums =  'supersededdatums', // Water level stations with superseded datums.
    benchmarks =  'benchmarks', // Water level stations with published benchmarks.
    supersededbenchmarks =  'supersededbenchmarks', // Water level stations with superseded benchmarks.
    currents =  'currents', // Real-time current meter stations that are presently deployed and are actively measuring currents.
    historiccurrents =  'historiccurrents', // Current meter stations that are no longer deployed, such as historic real-time stations that have been uninstalled or short-term survey stations.
    surveycurrents =  'surveycurrents', // Short-term current meter stations that collected data for a limited time in order improve tidal current predictions or support operational forecast models.
    currentpredictions =  'currentpredictions', // Current meter stations for which tidal current predictions are available.
    cond =  'cond', // Stations that have conductivity sensors installed.
    watertemp =  'watertemp', // Stations that have water temperature sensors installed.
    physocean =  'physocean', // Stations that have a physical oceanography(water temperature/conductivity) sensor installed.
    tcoon =  'tcoon', // Stations that are affiliated with the Texas Coastal Ocean Observation Network (TCOON).
    oneminute =  '1minute', // Stations that have 1 minute water level data.
    airgap =  'airgap', // Stations that have air gap data.
    visibility =  'visibility', // Stations that have visibility sensors installed.
    highwater =  'highwater', // Stations that are in High Water Alert.
    lowwater =  'lowwater' // Stations that are in Low Water Alert.
}