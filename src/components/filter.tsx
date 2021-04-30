import {Text, Tray, TrayHeader, Stack, Tab, Input, FormLabel} from "@dossier/mithra-ui";
import React from "react";

export class Filter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeTab: null,
        }
    }
    handleClick(str:string) {
        this.setState({
            activeTab: str,
        })
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
                        onClick={()=>this.handleClick('Kategori')}
                    >
                        Kategori
                    </Tab>
                    <Tab
                        active={activeTab === "Lokasjon"}
                        onClick={()=>this.handleClick('Lokasjon')}
                    >
                        Lokasjon
                    </Tab>
                    <Tab
                        active={activeTab === "Posisjon"}
                        onClick={()=>this.handleClick('Posisjon')}
                    >
                        Posisjon
                    </Tab>
                    <Tab
                        active={activeTab === "Spesialisering"}
                        onClick={()=>this.handleClick('Spesialisering')}
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