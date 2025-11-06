import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";
import axios from "../utils/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("/admin/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Transactions
      </Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}} >Student</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Amount (₹)</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Status</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Payment Mode</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.studentId.name || "-"}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell>{t.paymentMethod || "-"}</TableCell>
                  <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default Transactions;
