import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputLabel, MenuItem } from "@material-ui/core";
import { IExpensesData } from "./types";

function ExpensesTable() {
  const [expensesData, setExpensesData] = useState<IExpensesData[]>([]);
  const [month, setMonth] = useState<string>("01");
  const [year, setYear] = useState<string>("2021");
  const [expenseTotal, setExpenseTotal] = useState(0);

  const getExpenses = useCallback(async (mes, ano) => {
    try {
      const response = await api.get(`/despesas?mes=${ano}-${mes}`);
      const { data } = response;
      setExpensesData(data);

      let sum = data.reduce(function (total: any, currentValue: any) {
        return total + currentValue.valor;
      }, 0);

      setExpenseTotal(sum);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const filteredMonth = [
    { label: "Janeiro", value: "01" },
    { label: "Feveireiro", value: "02" },
    { label: "Março", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Maio", value: "05" },
    { label: "Junho", value: "06" },
    { label: "Julho", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Setembro", value: "09" },
    { label: "Outubro", value: "10" },
    { label: "Novembro", value: "11" },
    { label: "Dezembro", value: "12" },
  ];

  const filteredYear = ["2021", "2020"];

  useEffect(() => {
    getExpenses(month, year);
  }, [getExpenses, month, year]);

  useEffect(() => {
    if (month && year) {
      getExpenses(month, year);
    }
  }, [month, year, getExpenses]);

  return (
    <>
      <div style={{ padding: 13, display: "flex", alignItems: "center" }}>
        <FormControl style={{ paddingRight: 10 }}>
          <InputLabel>Ano</InputLabel>
          <Select
            style={{ width: "80px" }}
            value={year}
            onChange={(event) => setYear(event.target.value as string)}
          >
            {filteredYear.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Mês</InputLabel>
          <Select
            style={{ width: "150px" }}
            value={month}
            onChange={(event) => setMonth(event.target.value as string)}
          >
            {filteredMonth.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "end",
            fontWeight: "bold",
          }}
        >
          Despesa total: R$ {expenseTotal.toFixed(2)}
        </div>
      </div>
      {expensesData && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Despesas
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Categoria
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Dia
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Valor (R$)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expensesData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.descricao}
                  </TableCell>
                  <TableCell align="right">{row.categoria}</TableCell>
                  <TableCell align="right">{row.dia}</TableCell>
                  <TableCell align="right">{row.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  );
}

export default ExpensesTable;
