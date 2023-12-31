function DocumentsTable({
	colNames,
	data,
	searchFilter,
	searchName,
	colWidth,
}) {
	const renderColumns = colNames?.map((colName, index) => {
		return (
			<th style={{ minWidth: colWidth ? colWidth[index] : "5em" }}>
				{colName}
			</th>
		);
	});

	const renderData = data?.map((row, index) => (
		<tr key={index}>
			{Object.values(row).map((value, subIndex) => (
				<td key={subIndex}>{value}</td>
			))}
		</tr>
	));

	const searchFilterContainer = (
		<div className="search-filter-container">
			<input
				type="search"
				id="form1"
				className="form-control"
				placeholder={searchName ? `Search by ${searchName}` : "Search..."}
				style={{ minWidth: "15em", margin: "0 1em" }}
				// onKeyUp={handleSearchSubmit}
				// onChange={handleSearchChange}
				// value={state.searchValue}
			/>
			<button
				type="button"
				className="btn btn-primary"
				// onClick={handleSearchSubmit}
			>
				Search
			</button>
		</div>
	);

	return (
		<div>
			{searchFilter && searchFilterContainer}

			<div
				className="table-content"
				style={{
					marginTop: "3em",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<table
					border="1"
					style={{
						overflow: "hidden",
					}}
				>
					<thead>
						<tr>{renderColumns}</tr>
					</thead>
					<tbody>{renderData}</tbody>
				</table>
			</div>
		</div>
	);
}

export default DocumentsTable;
