import {Text, Tray, TrayHeader, Stack, Tab, Input, FormLabel} from "@dossier/mithra-ui";
import React from "react";
import {getCoursesByFilter} from "../functions/filterFunctions";

export class Filter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeTab: null,
            error: '',
        }
    }

    async handleClick(str: string) {
        const path = window.location.pathname;
        if (str !== this.state.activeTab) {
            if (path === "/courses") {
                try {
                    let filteredCourses = await getCoursesByFilter(str)
                    this.props.setFilteredCourses(filteredCourses)
                } catch (err) {
                    this.setState({error: 'Couldnt get courses'})
                }
            } else if (path === "/mycourses") {
                console.log('path === myCourses')
            } else if (path === "/dinside") {
                console.log('path === dinSide')
            }
        }
        this.setState({
            activeTab: str,
        })
    }

    componentDidMount() {
    }

    render() {
        const close = this.props.closeFunction
        const {activeTab} = this.state
        const inputDiv = {
            paddingTop: '1rem',
        }
        return (
            <Tray key="filter"
                //@ts-ignore
                  closeButtonProps={{title: 'Close', onClick: close}}
                //@ts-ignore
                  width="632px">
                <TrayHeader>Filter:</TrayHeader>
                <Stack>
                    <Tab
                        active={activeTab === "Kategori"}
                        onClick={() => this.handleClick('Kategori')}
                    >
                        Kategori
                    </Tab>
                    <Tab
                        active={activeTab === "Lokasjon"}
                        onClick={() => this.handleClick('Lokasjon')}
                    >
                        Lokasjon
                    </Tab>
                    <Tab
                        active={activeTab === "Posisjon"}
                        onClick={() => this.handleClick('Posisjon')}
                    >
                        Posisjon
                    </Tab>
                    <Tab
                        active={activeTab === "Spesialisering"}
                        onClick={() => this.handleClick('Spesialisering')}
                    >
                        Spesialisering
                    </Tab>
                </Stack>

                <div style={inputDiv}>
                    <FormLabel
                        htmlFor="search-field"
                        label="Søkefelt"
                    />
                    <Input
                        fillParent
                        id="search-field"
                        placeholder="Søk her..."
                    />
                </div>
                <Text>Tagger:</Text>
                <Text>Søkeresultater:</Text>
            </Tray>
        );
    }

}