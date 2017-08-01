/*
 * @providesModule AresRouteMap
 */


import AresPage from 'AresPage'

let map = {}
for (let page in AresPage) {
  map[page] = {component: AresPage[page]}
}

export default map
