async function get_artifactsList() {
    try {
        const response = await fetch('data/artifacts.csv');
        const csvText = await response.text();
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    resolve(results.data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('CSV 파일을 읽는 중 오류 발생:', error);
        return [];
    }
}


function get_artifactsInfo(artifactsName) {
    fetch('data/artifacts.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    const data = results.data;
                    const targetRow = data.find(row => row.name === artifactsName);
                    if (targetRow) {
                        return targetRow;
                    } else {
                        console.log('해당 성유물을 찾을 수 없습니다.');
                        return null;
                    }
                }
            });
        })
        .catch(error => {
            console.error('CSV 파일을 읽는 중 오류 발생:', error);
            return null;
        });
}
