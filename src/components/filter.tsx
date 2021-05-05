import {Text, Tray, TrayHeader, Stack, Tab, Input, FormLabel, Button} from "@dossier/mithra-ui";
import React from "react";
import {getFilteredCourses, getQueryResult} from "../functions/filterFunctions";

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
        // if (fromWhere !== this.state.activeTab) {
        try {
            let filtrationTags = await getFilteredCourses(fromWhere, path)
            this.setState({filtrationTags})
            // this.props.setFilteredCourses(filteredCourses)
        } catch (err) {
            this.setState({error: 'Couldnt get courses'})
        }
        // }
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
        let queryResult = await getQueryResult(activeTab, selectedTags, path)
        if (path === '/courses') {
            this.props.setCourses(queryResult);
        } else {
            this.props.setMyCourses(queryResult);
        }
        this.props.closeFunction();
    }

    resetFilter() {
        window.location.reload()
        this.props.setFilteringState(false)
    }

    render() {
        const close = this.props.closeFunction
        const {activeTab, selectedTags, filtrationTags, inputField} = this.state
        const filtrationTagsCard = filtrationTags.map((tag: any) => {
            return (<div onClick={(event) => this.handleAddTag(event)} id={tag[1]}>{tag[0]}</div>)
        })
        const selectedTagsCards = filtrationTags.map((tag:any)=> {
            for (let i = 0; i < selectedTags.length; i++) {
                if (tag[1] === parseInt(selectedTags[i])) {
                    return (<div onClick={(event) => this.handleRemoveTag(event)} id={tag[1]}>{tag[0]}</div>)
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
                <Text>Tagger: <div>{selectedTagsCards}</div></Text>
                <Text>Søkeresultater:</Text>
                <Text>{filtrationTagsCard}</Text>
                <Button text="Søk Her!" onClick={()=>this.searchQueryByFilter()}></Button>
                <Button text="Reset Filter" onClick={()=>this.resetFilter()}></Button>
            </Tray>
        );
    }

}