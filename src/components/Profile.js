import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Left, Title, Body } from 'native-base';
import { Card, Button, CardSection,Input } from './common';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { photoUpdate, photoCreate } from '../actions'

class Profile extends Component {

    static navigationOptions = {
        drawerLabel: 'Profile',
    };

    state = { email: '' };

    componentDidMount() {
        // console.log(this.props.user)
        if (this.props.user) {
            if (this.props.user.user) {
                this.setState({ email: this.props.user.user.email });
            }
            else {
                this.setState({ email: this.props.user.email });
            };
        };
    };

    logOut = () => {
        this.props.logoutUser();
        this.props.screenProps.rootNavigation.navigate('Login');
    }
    onPhotoChange = (text) => {
        this.props.photoUpdate('photo', text);
    }

    onCaptionChange = (text) => {
        this.props.photoUpdate('caption', text);
    }

    onButtonPress = () => {
        const { photo, caption } = this.props;

        this.props.photoCreate(photo, caption);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>{this.state.email}</Title>
                </Header>
                    <View >
                        <Card>
                            <CardSection>
                                <Input
                                    label="photo"
                                    placeholder="Image URL"
                                    value={this.props.photo}
                                    onChangeText={this.onPhotoChange}
                                />
                            </CardSection>
                            <CardSection>
                                <Input
                                    label="caption"
                                    placeholder="Caption"
                                    value={this.props.caption}
                                    onChangeText={this.onCaptionChange}
                                />
                            </CardSection>
                            <CardSection>
                                <Button onPress={this.onButtonPress}>
                                    Post
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={this.logOut}>
                                    Log Out
                                </Button>
                            </CardSection>
                        </Card>
                    </View>
                </Container>
            )
        }
    }

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { photo, caption } = state.photoForm

    return { user,photo,caption }
};

export default connect(mapStateToProps, { logoutUser, photoUpdate, photoCreate })(Profile);