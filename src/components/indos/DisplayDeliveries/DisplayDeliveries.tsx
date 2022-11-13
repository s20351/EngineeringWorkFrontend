import React, { useEffect } from "react";
import iconX from "../../../assets/x.jpg";
import { StyledFieldSet, StyledDiv, H1 } from "./styledDisplayDeliveries";
import { getDeliveries } from "../../../services";
import { useForm } from "../UseForm";
import "./styledDisplayDeliveries.css"
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

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

export const DisplayDeliveries: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
    const [deliveries, setDeliveries] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false)
    const outsideRef = React.useRef(null);
    const handleCloseOnOverlay = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const deliveriesData = await getDeliveries();
            setDeliveries(deliveriesData);
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
                                {TableIndos(deliveries, isLoading)}
                            </StyledDiv>
                        </StyledFieldSet>
                    </form>
                </div>
            </div>
        </div>
    ) : null;

function TableIndos(deliveries: any, isLoading: boolean) {
        interface Delivery {
          date: Date;
          name: string;
          surname: string,
          weight: number
        }
      
        const objects: Array<Delivery> = deliveries;
      
        const tableContainerSx: SxProps = {
          width: "max-content",
          maxHeight: 400,
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
                    <TableCell>Data dostawy</TableCell>
                    <TableCell>Imię hodowcy</TableCell>
                    <TableCell>Nazwisko hodowcy</TableCell>
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
                      <TableRow key={`${object.name} + ${object.surname} + ${object.date} `} >
                        <TableCell align="center">{object.date.toString()}</TableCell>
                        <TableCell align="center">{object.name}</TableCell>
                        <TableCell align="center">{object.surname}</TableCell>
                        <TableCell align="center">{object.weight}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer> : <H1>Brak dostaw do wyświetlenia</H1>
        ) : <H1>Trwa ładowanie danych o dostawach...</H1>;
      }
};
