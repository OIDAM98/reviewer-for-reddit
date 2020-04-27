import React from 'react'
import { WebProps, WebState } from '../../types/navigation';
import { WebView } from 'react-native-webview'
import { View } from 'react-native';
import { defaults } from '../styles';

export default class WebViewer extends React.Component<WebProps, WebState> {
    state: Readonly<WebState> = {
        url: this.props.route.params.url || ''
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: 'Reddit Online' })
    }

    render() {
        return (
            <View style={defaults.all}>
                <WebView
                    source={{ uri: `https://www.reddit.com/${this.state.url}` }}
                    originWhitelist={['https://*.reddit.com/*']}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={true}
                />
            </View>
        )
    }

}