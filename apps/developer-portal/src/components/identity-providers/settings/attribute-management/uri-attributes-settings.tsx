/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Heading, Hint } from "@wso2is/react-components";
import _ from "lodash";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { Divider, Form, Grid } from "semantic-ui-react";
import { DropdownOptionsInterface } from "../attribute-settings";

interface AdvanceAttributeSettingsPropsInterface {
    dropDownOptions: DropdownOptionsInterface[];
    initialSubjectUri: string;
    initialRoleUri: string;
    claimMappingOn: boolean;
    updateRole: (roleUri: string) => void;
    updateSubject: (subjectUri: string) => void;
}

export const UriAttributesSettings: FunctionComponent<AdvanceAttributeSettingsPropsInterface> = (
    props
): ReactElement => {

    const {
        dropDownOptions,
        initialSubjectUri,
        initialRoleUri,
        claimMappingOn,
        updateRole,
        updateSubject
    } = props;

    const getValidatedInitialValue = (initialValue: string) => {
        return _.find(dropDownOptions, option => option?.value === initialValue) !== undefined ? initialValue : "";
    }

    return (
        <>
            <Grid.Row>
                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 10 }>
                    <Divider/>
                    <Divider hidden/>
                </Grid.Column>
                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                    <Heading as="h5">Subject</Heading>
                    <Divider hidden/>
                    <Form>
                        <Form.Select
                            fluid
                            required={ true }
                            options={ dropDownOptions }
                            value={ getValidatedInitialValue(initialSubjectUri) }
                            placeholder={ "Select Attribute" }
                            onChange={
                                (event, data) => {
                                    updateSubject(data.value.toString())
                                }
                            }
                            search
                            fullTextSearch={ false }
                            error={ _.isEmpty(getValidatedInitialValue(initialSubjectUri)) && {
                                content: "Please select an attribute for subject",
                                pointing: "above"
                            } }
                            label={ "Subject Attribute" }
                        />
                    </Form>
                    <Hint>
                        Specifies the attribute that identifies the user at the identity provider
                    </Hint>
                </Grid.Column>
            </Grid.Row>
            {
                claimMappingOn &&
                <Grid.Row columns={ 2 }>
                    <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 10 }>
                        <Divider/>
                        <Divider hidden/>
                    </Grid.Column>
                    <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                        <Heading as="h5">Role</Heading>
                        <Divider hidden/>
                        <Form>
                            <Form.Select
                                fluid
                                required={ true }
                                options={ dropDownOptions }
                                value={ getValidatedInitialValue(initialRoleUri) }
                                placeholder={ "Select Attribute" }
                                onChange={
                                    (event, data) => {
                                        updateRole(data.value.toString())
                                    }
                                }
                                search
                                fullTextSearch={ false }
                                error={ _.isEmpty(getValidatedInitialValue(initialRoleUri)) && {
                                    content: "Please select an attribute for role",
                                    pointing: "above"
                                } }
                                label={ "Role Attribute" }
                            />
                        </Form>
                        <Hint>
                            Specifies the attribute that identifies the Roles at the Identity Provider
                        </Hint>
                    </Grid.Column>
                </Grid.Row>
            }
        </>
    )
};