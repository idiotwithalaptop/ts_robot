import React from "react";
import tableTile from "../../public/tabletile.jpg"
import styled from "styled-components";
import Context from "../../../domain/context";
import RobotComponent from "./Robot";

const TableColumn = styled.div({
    width: "80vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between"
});

const TableCell = styled.div({
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
});

const TableSection = styled.div({
    display: "flex",
    background: `url(${tableTile}) repeat`
});

type TableProps = {
    width: number,
    height: number,
    context: Context
}


export default class Table extends React.Component<TableProps> {
    constructor(props : TableProps) {
        super(props);
    }

    render() : JSX.Element {
        return <TableSection>
            {
                [...Array(this.props.width)].map((value : undefined, colIdx : number) => {
                    return <TableColumn key={colIdx}>
                        {
                            [...Array(this.props.width)].map((value : undefined, rowIdx : number) => {
                                return <TableCell>
                                    {this.props.context.robot.x == colIdx && this.props.context.robot.y == rowIdx ? <RobotComponent robot={this.props.context.robot} /> : "" }
                                </TableCell>
                            })
                        }
                    </TableColumn>
                })
            }
        </TableSection>;
    }
}
