import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import configs from 'react-global-configuration';

import { Container, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

class Root extends React.Component
{
    constructor(props) {
        super(props);
    }

    state = {
        group : 'normal',
        tags : [],
    };

    handleChangeGroup = ( group ) => {
        this.setState({ group : group });
    };

    toggleTag = ( tagString ) => {
        if (this.getTagIndex(tagString) === false) {
            this.addTag(tagString);
        } else {
            this.removeTag(tagString);
        }
    };

    getTagIndex = ( tagString ) => {
        let tagIndex = false;
        this.state.tags.map((tag, index) => {
            if (tag == tagString) {
                tagIndex = index;
            }
        });
        return tagIndex;
    };

    addTag = ( tagString ) => {
        let tags = this.state.tags;
        tags.push(tagString);
        this.setState({ tags : tags });
    };

    removeTag = ( tagString ) => {
        let tags = this.state.tags;
        let removeIndex = this.getTagIndex(tagString);

        if ( removeIndex !== false) {
            tags.splice(removeIndex, 1);
            this.setState({ tags : tags });
        }
    };

    getContents = () => {
        const contents = configs.get('contents')[this.state.group];
        return (contents !== undefined) ? contents : [];
    };

    hasTagsByArray = ( tagsArray ) => {
        if (this.state.tags.length === 0) {
            return true;
        }
        for (const index in tagsArray) {
            if (this.getTagIndex(tagsArray[index]) !== false) {
                return true;
            }
        }
        return false;
    };

    handleButton = (data) => {
        const value =  data.label + '：' + data.value;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, data, (response) => {
            });
        });
    };

    render() {
        const styles = {
            container : {},
            row : {
                'marginBottom' : '10px',
            },
            col : {},
            button : {
                'margin' : '0 3px 2px 3px',
            },
        };

        return (
            <Container style={ styles.container }>
                <Row style={ styles.row }>
                    <Col>
                        <ButtonToolbar>
                            {configs.get('groups').group.map((data) => {
                                return (
                                    <Button
                                        key={ data.name }
                                        style={ styles.button }
                                        size={'sm'}
                                        variant={'outline-danger'}
                                        onClick={ () => this.handleChangeGroup( data.name ) }
                                        active={ this.state.group === data.name }
                                        >{ data.label }</Button>
                                )
                            })}
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row style={ styles.row }>
                    <Col>
                        <ButtonToolbar>
                            {configs.get('groups').tags.map((data) => {
                                return (
                                    <Button
                                        key={ data.name }
                                        style={ styles.button }
                                        size={'sm'}
                                        variant={'outline-secondary'}
                                        onClick={ () => this.toggleTag( data.name ) }
                                        active={ this.getTagIndex(data.name) !== false }
                                        >{ data.label }</Button>
                                )
                            })}
                        </ButtonToolbar>
                    </Col>     
                </Row>
                <Row style={ styles.row }>
                    <Col>
                        <ButtonToolbar>
                            {this.getContents().map((data) => {
                                return this.hasTagsByArray(data.tags) && (
                                    <Button
                                        key={ data.name }
                                        style={ styles.button }
                                        size={'sm'}
                                        variant={'info'}
                                        onClick={ () => this.handleButton( data ) }
                                        block={ true }
                                        >{ data.label }：{ data.value }</Button>
                                )
                            })}
                        </ButtonToolbar>
                    </Col>     
                </Row>
            </Container>
        )
    }
}

Root.defaultProps = {
};

Root.propTypes = {
    style : PropTypes.object
};

export default Root;