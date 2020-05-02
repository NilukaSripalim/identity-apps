/**
* Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the 'License'); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import React, { ReactElement } from "react";
import { Grid, Image, Message, Table } from "semantic-ui-react";
import { AvatarBackground } from "../../..";
import { AddExternalClaim } from "../../../../models";

/**
 * Prop types of the `SummaryAddDialect` component.
 */
interface SummaryAddDialectPropsInterface {
    /**
     * The dialectURI added.
     */
    dialectURI: string;
    /**
     * The external claims added.
     */
    claims: AddExternalClaim[];
}

/**
 * This generates the first letter of a claim
 * @param {string} name 
 * @return {string} The first letter of a claim
 */
const generateClaimLetter = (name: string): string => {
    const stringArray = name.replace("http://", "").split("/");
    return stringArray[ stringArray.length - 1 ][ 0 ].toLocaleUpperCase();
}

/**
 * Renders teh summary step of the add dialect wizard.
 * 
 * @param {SummaryAddDialectPropsInterface} props
 * 
 * @return {ReactElement}
 */
export const SummaryAddDialect = (props: SummaryAddDialectPropsInterface): ReactElement => {

    const { dialectURI, claims } = props;

    return (
        <Grid className="wizard-summary">
            <Grid.Row columns={ 1 }>
                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 16 } textAlign="center">
                    <div className="general-details">
                        <h3>{ dialectURI }</h3>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column width={ 16 }>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>

                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    External Attribute URI
                                    </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Mapped Local Attribute URI
                                    </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { claims.map((claim: AddExternalClaim, index: number) => {
                                return (
                                    <Table.Row key={ index } columns={ 2 }>
                                        <Table.Cell>
                                            <Image
                                                floated="left"
                                                verticalAlign="middle"
                                                rounded
                                                centered
                                                size="mini"
                                            >
                                                <AvatarBackground />
                                                <span className="claims-letter">
                                                    { generateClaimLetter(claim.claimURI) }
                                                </span>
                                            </Image>
                                        </Table.Cell>
                                        <Table.Cell>
                                            { claim.claimURI }
                                        </Table.Cell>
                                        <Table.Cell>
                                            { claim.mappedLocalClaimURI }
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }) }
                            {
                                claims.length === 0 && (
                                    <Table.Row>
                                        <Table.Cell colSpan={ 3 } textAlign='center'>
                                            <Message warning>No external attribute was added.</Message>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};