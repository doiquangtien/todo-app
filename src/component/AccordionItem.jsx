import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
// import DialogComfirm from "./DialogComfirm";

export default function AccordionItem({ data, handleOpenComfirm }) {
  const createdAt = new Date(data.createdAt).toLocaleDateString();
  const navigate = useNavigate();
  const taskRemaining = data.todos?.filter((todo) => todo.status === true);
  return (
    <WrapAccordion>
      {/* <DialogComfirm /> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ color: "#1a76d2", fontWeight: "500" }}>
            {data.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetailsStyled>
          <div style={{ color: "#1a76d2", fontWeight: "500" }}>
            Created At :{" "}
            <span style={{ color: "var(--main-color)", fontWeight: "500" }}>
              {createdAt}
            </span>
          </div>
          <div style={{ color: "#1a76d2", fontWeight: "500" }}>
            Task Remaining :{" "}
            <span style={{ color: "var(--main-color)", fontWeight: "500" }}>
              {taskRemaining?.length || 0}/{data.todos?.length || 0}
            </span>
          </div>
          <GroupBtn>
            <WorkIcon
              className="iconWork"
              onClick={() => {
                navigate(`/list/${data.id}`);
              }}
            />
            <DeleteIcon className="iconDelete" onClick={handleOpenComfirm} />
          </GroupBtn>
        </AccordionDetailsStyled>
      </Accordion>
    </WrapAccordion>
  );
}

const GroupBtn = styled.div`
  width: 10%;
  justify-content: space-around;
  display: flex;

  .iconWork {
    cursor: pointer;

    color: #1a76d2;
  }
  .iconDelete {
    cursor: pointer;

    color: #d9534f;
  }
`;

const WrapAccordion = styled.div`
  margin: 15px 0;
`;

const AccordionDetailsStyled = styled(AccordionDetails)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-top: 1px solid #ccc;
`;
