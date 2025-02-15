function get_artifactsList() {
}


function get_artifactsInfo(name) {
    fetch('data/artifacts.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    const data = results.data;
                    const targetRow = data.find(row => row.name === params.get('name'));
                    if (targetRow) {
                        document.write(JSON.stringify(targetRow, null, 2));
                    } else {
                        console.log('해당 성유물을 찾을 수 없습니다.');
                    }
                }
            });
        })
        .catch(error => {
            console.error('CSV 파일을 읽는 중 오류 발생:', error);
        });
}
