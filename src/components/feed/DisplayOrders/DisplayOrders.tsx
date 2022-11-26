import React, { useContext, useEffect, useState } from "react";
import iconX from "../../../assets/x.jpg";
import { StyledFieldSet, StyledDiv, H1 } from "./styledDisplayOrders";
import { getFeedDetailsByFarmerId } from "../../../services";
import { useForm } from "../UseForm";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    SxProps,
    Paper
} from "@mui/material";
import { FarmerContext } from "../../../providers/FarmerDataProvider";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

export const DisplayOrders: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [feed, setFeed] = React.useState([]);
    const outsideRef = React.useRef(null);
    const { data } = useContext(FarmerContext);
    const handleCloseOnOverlay = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFeedDetailsByFarmerId(data.id);
            setFeed(response);
            setIsLoading(true);
        }
        fetchData()
            .catch(console.error)
    }, [isOpen]);

    const { onChange, onSubmit } = useForm('');

    return isOpen ? (
        <div className={"modal"}>
            <div
                ref={outsideRef}
                className={"modal__overlay"}
                onClick={handleCloseOnOverlay}
            />
            <div className={"modal__box"}>
                <button className={"modal__close"} onClick={onClose}>
                    <img src={iconX} alt={"close"} />
                </button>
                <div className={"modal__title"}>{title}</div>

                <div className={"modal__content"}>
                    <form onSubmit={onSubmit}>
                        <StyledFieldSet>
                            <StyledDiv>
                                {TableFeed(feed, isLoading)}
                            </StyledDiv>
                        </StyledFieldSet>
                    </form>
                </div>
            </div>
        </div>
    ) : null;

    function TableFeed(feed: any, isLoading: boolean) {
        interface ObjectsFeed {
            objectID: number;
            farmName: string;
            arrivalDate: Date,
            weight: number
        }

        const objects: Array<ObjectsFeed> = feed;

        const tableContainerSx: SxProps = {
            width: "max-content",
            maxHeight: 500,
            border: "1px solid rgba(128,128,128,0.4)",
            marginLeft: "auto",
            marginRight: "auto",
            mariginTop: 4,
            borderRadius: 4,
        };

        return isLoading ? (
            objects.length > 0 ?
                <TableContainer component={Paper} sx={tableContainerSx}>
                    <Table stickyHeader={false}>
                        <TableHead
                            sx={{
                                "& th": {
                                    backgroundColor: "rgb(27, 77, 137)",
                                    fontSize: "1.2rem",
                                },
                            }}
                        >
                            <TableRow
                                sx={{
                                    backgroundColor: "rgb(27, 77, 137)",
                                    borderBottom: "2px solid black",
                                    "& th": {
                                        color: "rgb(249, 228, 91)",
                                    },
                                }}
                            >
                                <TableCell>Nazwa Obiektu</TableCell>
                                <TableCell>Data przyjazdu</TableCell>
                                <TableCell>Waga</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                "& tr:nth-of-type(2n+1)": {
                                    backgroundColor: "grey.100",
                                },
                            }}
                        >
                            {
                                objects.map((object) => (
                                    <TableRow key={object.objectID} >
                                        <TableCell align="center">{object.farmName}</TableCell>
                                        <TableCell align="center">{object.arrivalDate.toString()}</TableCell>
                                        <TableCell align="center">{object.weight}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <H1>Brak zamówień paszy do wyświetlenia</H1>
        ) : <H1>Trwa ładowanie danych o zamówieniach paszy...</H1>;
    }
};
