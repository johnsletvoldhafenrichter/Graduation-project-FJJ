import {Text, Tray, TrayHeader, Stack, Tab, Input, FormLabel, Button, Tag} from "@dossier/mithra-ui";
import React from "react";
import {getFilteredCourses, getQueryResult} from "../functions/filterFunctions";
import "../css/filter.css"

export class Filter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeTab: null,
            error: '',
            filtrationTags: [],
            selectedTags: [],
            inputField: '',
        }
    }

    async handleClick(fromWhere: string) {
        const path = window.location.pathname;
        try {
            let filtrationTags = await getFilteredCourses(fromWhere, path)
            this.setState({filtrationTags})
        } catch (err) {
            this.setState({error: 'Couldnt get courses'})
        }
        this.setState({
            activeTab: fromWhere,
        })
    }

    handleAddTag(event: any) {
        const id = parseInt(event.target.id)
        const selectedTags = this.state.selectedTags
        if (!selectedTags.includes(id)) {
            selectedTags.push(id)
        }
        this.setState({selectedTags})
    }

    handleRemoveTag(event: any) {
        const selectedTags = this.state.selectedTags
        const id = parseInt(event.target.id)
        for( var i = 0; i < selectedTags.length; i++){
            if ( selectedTags[i] === id) {
                selectedTags.splice(i, 1);
            }
        }
        this.setState({selectedTags})
    }

    handleChange(event:any) {
        this.setState({
            inputField: [event.target.value]
        })
    }

    async searchQueryByFilter() {
        const path = window.location.pathname;
        const {selectedTags, activeTab} = this.state
        this.props.setFilteringState(true)
        let queryResult = await getQueryResult(activeTab, selectedTags, path)
        if (path === '/courses') {
            this.props.setCourses(queryResult);
        } else {
            this.props.setMyCourses(queryResult);
        }
    }

    resetFilter() {
        window.location.reload()
        this.props.setFilteringState(false)
    }

    render() {
        const close = this.props.closeFunction
        const {activeTab, selectedTags, filtrationTags, inputField} = this.state
        const filtrationTagsCard = filtrationTags.map((tag: any) => {
            return (<div style={{margin: '0 1em 1em 0',}}><Tag intent="neutral" text={tag[0]} onClick={(event) => this.handleAddTag(event)} id={tag[1]}/></div>)
        })
        const selectedTagsCards = filtrationTags.map((tag:any)=> {
            for (let i = 0; i < selectedTags.length; i++) {
                if (tag[1] === parseInt(selectedTags[i])) {
                    return (<div style={{margin: '0 1em 1em 0',}}><Tag intent="neutral" text={tag[0]} onClick={(event) => this.handleRemoveTag(event)} id={tag[1]}/></div>)
                }
            }
            return
        })

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
                        active={activeTab === "category"}
                        onClick={() => this.handleClick('category')}
                    >
                        Kategori
                    </Tab>
                    <Tab
                        active={activeTab === "location"}
                        onClick={() => this.handleClick('location')}
                    >
                        Lokasjon
                    </Tab>
                    <Tab
                        active={activeTab === "position"}
                        onClick={() => this.handleClick('position')}
                    >
                        Posisjon
                    </Tab>
                    <Tab
                        active={activeTab === "specialization"}
                        onClick={() => this.handleClick('specialization')}
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
                        onChange={(event)=>this.handleChange(event)}
                        value={inputField}
                    />
                </div>
                <Text>Tagger: <div className="tagParent">{selectedTagsCards}</div></Text>
                <Text>Søkeresultater:</Text>
                <div className="tagParent">{filtrationTagsCard}</div>
                <Button text="Søk Her!" onClick={()=>this.searchQueryByFilter()}></Button>
                <Button text="Reset Filter" onClick={()=>this.resetFilter()}></Button>
            </Tray>
        );
    }

}