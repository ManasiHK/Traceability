import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { List, Checkbox } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CardView from 'react-native-cardview';

class TraceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            code: '',

            stoneRoughWeight: '',
            countryOfOrigin: '',

            lotNumber: '',
            artisanSort: '',
            stoneWeightSort: '',
            colorSort: '', 
            artisanPlan: '',
            stoneWeightPlan: '',
            colorPlan: '',
            shapePlan: '',
            clarityPlan: '',

            artisanCut: "",
            stoneWeightCut: "",
            colorCut: "",
            shapeCut: "",
            clarityCut: "",
            cut: "",

            artisanDesign: '',
            stoneWeightDesign: '',
            metalWeightDesign: "",
            metalCaratDesign: '',
            colorDesign: '',
            shapeDesign: '',
            clarityDesign: '',
            cutDesign: '',
            polishDesign: '',
            symmetryDesign: '',

            cert: "",
            reportNumberCert: "",
            measurementsCert: "",
            stoneWeightCert: "",
            stoneCaratCert: "",
            metalWeightCert: "",
            metalCaratCert: "",
            polishCert: "",
            colorCert: "",
            shapeCert: "",
            girdleInscriptionNoCert: "",
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        let code = await AsyncStorage.getItem("traceCode", "");
        code = JSON.parse(code);
        this.setState({
            code: code,
        }, function () {
            this.getOrigin();
            this.getSorting();
            this.getPlanning();
            this.getCutting();
            this.getDesign();
            this.getCert();
        })
        console.log("code::", code);
    }

    getOrigin = async () => {
        fetch(`http://3.6.46.133:3000/api/Origin/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    stoneRoughWeight: response.stoneRoughWeight,
                    countryOfOrigin: response.countryOfOrigin
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getSorting = async () => {
        fetch(`http://3.6.46.133:3000/api/Sorting/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    lotNumber: response.lotNumber,
                    artisanSort: response.artisan,
                    colorSort: response.color,
                    stoneWeightSort: response.stoneWeight
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getPlanning = async () => {
        fetch(`http://3.6.46.133:3000/api/Planning/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    artisanPlan: response.artisan,
                    stoneWeightPlan: response.stoneWeight,
                    colorPlan: response.color,
                    clarityPlan: response.clarity,
                    shapePlan: response.shape
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCutting = async () => {
        fetch(`http://3.6.46.133:3000/api/Cutting/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    artisanCut: response.artisan,
                    stoneWeightCut: response.stoneWeight,
                    colorCut: response.color,
                    cut: response.cut,
                    shapeCut: response.shape,
                    clarityCut: response.clarity
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getDesign = async () => {
        fetch(`http://3.6.46.133:3000/api/DesignManufacture/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    artisanDesign: response.artisan,
                    stoneWeightDesign: response.stoneWeight,
                    metalCaratDesign: response.metalCarat,
                    metalWeightDesign: response.metalWeight,
                    colorDesign: response.color,
                    shapeDesign: response.shape,
                    clarityDesign: response.clarity,
                    cutDesign: response.cut,
                    symmetryDesign: response.symmetry,
                    polishDesign: response.polish
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCert = async () => {
        fetch(`http://3.6.46.133:3000/api/Certification/${this.state.code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cert: response.cert,
                    reportNumberCert: response.reportNumber,
                    measurementsCert: response.measurements,
                    stoneCaratCert: response.stoneWeight,
                    metalWeightCert: response.metalWeight,
                    metalCaratCert: response.metalCarat,
                    polishCert:response.polish,
                    colorCert: response.color,
                    shapeCert: response.shape,
                    girdleInscriptionNoCert: response.girdleInscriptionNo
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });

    render() {
        return (
            <LinearGradient
            style={{
                flex: 1,
                width: "100%",
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 5,
            }}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.4, y: 0.5 }}
            colors={['rgba(243,96,151,0)', '#rgba(63,86,226,0.7)']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            <ScrollView>
            <CardView cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginTop: 20
                    }}>
                <List.Section >
                    <List.Accordion
                        title="Origin/Mining"
                        left={props => <List.Icon {...props} icon="origin" />}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Rough Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneRoughWeight}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Country of Origin:</Text> 
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.countryOfOrigin}</Text>
                    </List.Accordion>

                    <List.Accordion
                        title="Sorting"
                        left={props => <List.Icon {...props} icon="sort" />}
                    >
                        <Text  style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Lot Number</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.lotNumber}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Artisan</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.artisanSort}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Stone Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneWeightSort}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Color</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.colorSort}</Text>
                    </List.Accordion>

                    <List.Accordion
                        title="Planning"
                        left={props => <List.Icon {...props} icon="floor-plan" />}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Artisan</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.artisanPlan}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>stone Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneWeightPlan}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Color</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.colorPlan}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Shape</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.shapePlan}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Clarity</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.clarityPlan}</Text>
                    </List.Accordion>

                    <List.Accordion
                        title="Cutting/Polishing"
                        left={props => <List.Icon {...props} icon="box-cutter" />}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Artisan</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.artisanCut}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>stone Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneWeightCut}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Color</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.colorCut}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Shape</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.shapeCut}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Clarity</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.clarityCut}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Cut</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.cut}</Text>
                    </List.Accordion>

                    <List.Accordion
                        title="Design/Manufacturing"
                        left={props => <List.Icon {...props} icon="material-design" />}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Artisan</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.artisanDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>stone Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneWeightDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Metal Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.metalWeightDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Metal Carat</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.metalCaratDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Color</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.colorDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Shape</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.shapeDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Clarity</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.clarityDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Cut</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.cutDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Polish</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.polishDesign}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Symmetry</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.symmetryDesign}</Text>
                    </List.Accordion>

                    <List.Accordion
                        title="Certification"
                        left={props => <List.Icon {...props} icon="certificate" />}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Cert</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.cert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Report Number</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.reportNumberCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Measurements</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.measurementsCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Stone Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.stoneCaratCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Metal Weight</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.metalWeightCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Metal carat</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.metalCaratCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Polish</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.polishCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Color</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.colorCert}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: '#777' }}>Shape</Text>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{this.state.shapeCert}</Text>
                       
                    </List.Accordion>
                </List.Section>
                </CardView>
            </ScrollView>
            </LinearGradient>
        );
    }
}

export default TraceDetails;
