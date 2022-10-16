import React, { useRef } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { BsTrash, BsDash } from "react-icons/bs";
import { connect } from "react-redux";

import { deleteTodo, markComplete, markIncomplete } from "action/index";
import storeType from "types/storeType";
import AppPropType from "./AppPropType";

const App: React.FC<AppPropType> = ({
  complete,
  incomplete,
  deleteTodo,
  markComplete,
  markIncomplete,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (input.current) {
      const val = input.current.value;
      input.current.value = "";
      markIncomplete(val);
    }
  };

  const renderList = (type: "Complete" | "Incomplete") => {
    const looper = type === "Complete" ? complete : incomplete;

    return (
      <ListGroup as="ul" className=" mb-3">
        <h3>{type}</h3>
        {looper.map((todo, index) => {
          return (
            <ListGroup.Item
              key={index}
              as="li"
              variant={type === "Complete" ? "success" : "info"}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="name-tode">{todo}</div>
              <div>
								<i
									className={`fas fa-${
										type === "Complete" ? "minus" : "check"
									} m-2`}
									onClick={() => {
										type === "Complete"
											? markIncomplete(todo)
											: markComplete(todo);
									}}
								></i>
								<i
									className="fas fa-trash m-2"
									onClick={() => deleteTodo(todo)}
								></i>
							</div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  return (
    <div>
      <div className="mx-auto w-75 mt-3">
        <InputGroup className="mb-3">
          <FormControl placeholder="Todo" ref={input} />
          <Button variant="success" onClick={() => addTodo()}>
          <i className="fas fa-plus mr-3"></i>

            Add
          </Button>
        </InputGroup>

        {renderList("Incomplete")}
        {renderList("Complete")}
      </div>
    </div>
  );
};

const mapStateToProps = (state: storeType) => {
  return {
    complete: state.complete,
    incomplete: state.incomplete,
  };
};

export default connect(mapStateToProps, {
  deleteTodo,
  markComplete,
  markIncomplete,
})(App);
