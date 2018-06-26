import { server } from 'universal-webpack/config'
import settings from './universal-webpack-settings.json'
import configuration from './build'

export default server(configuration, settings)
