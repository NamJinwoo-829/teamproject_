export async function fetchFilteredPeople(queryParams) {
  try {
    const payload = {
      data_type: "table_filtering",
      data: {
        filtering: queryParams.filters,
        ...(queryParams.sort?.direction
          ? {
              sorting:
                queryParams.sort.direction === "desc"
                  ? "-" + queryParams.sort.key
                  : queryParams.sort.key,
            }
          : {}),
      },
    };

    const res = await fetch("http://127.0.0.1:8000/api/items/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result)
    if (Array.isArray(result?.data?.data)) {
      return result.data.data;
    } else {
      console.warn("예상하지 않은 응답 구조:", result);
      return [];
    }
  } catch (err) {
    console.error("서버 요청 실패:", err);
    return [];
  }
}
