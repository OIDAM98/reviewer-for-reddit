import React from 'react';
import { View } from 'react-native'
import { defaults } from './styles'

// Renders a fine line to separate Components
export function Separator() {
    return (
        <View style={defaults.separator} />
    )
}