import React  from 'react'
import Mozaik from 'mozaik/browser'
import time   from 'mozaik-ext-time'


const MozaikComponent = Mozaik.Component.Mozaik
const ConfigActions   = Mozaik.Actions.Config

Mozaik.Registry.addExtensions({ time })

React.render(<MozaikComponent/>, document.getElementById('mozaik'))

ConfigActions.loadConfig()
