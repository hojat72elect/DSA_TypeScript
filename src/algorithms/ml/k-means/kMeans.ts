import {Matrix} from "../../math/matrix/Matrix";
import {euclideanDistance} from "../../math/euclidean-distance/euclideanDistance";

/**
 * Classifies the point in space based on k-Means algorithm.
 *
 * @param data - array of dataSet points, i.e. [[0, 1], [3, 4], [5, 7]]
 * @param k - number of clusters
 * @return - the class of the point
 */
export function KMeans(
    data?: number[][],
    k: number = 1,
): number[] {
    if (!data) throw new Error('The data is empty');

    // Assign k clusters locations equal to the location of initial k points.
    const dataDim = data[0]!.length;
    const clusterCenters = data.slice(0, k);

    // Continue optimization till convergence.
    // Centroids should not be moving once optimized.
    // Calculate distance of each candidate vector from each cluster center.
    // Assign cluster number to each data vector according to minimum distance.

    // Matrix of distance from each data point to each cluster centroid.
    const distances = Matrix.zeros([data.length, k]);

    // Vector data points' classes. The value of -1 means that no class has bee assigned yet.
    const classes = Array(data.length).fill(-1);

    let iterate = true;
    while (iterate) {
        iterate = false;

        // Calculate and store the distance of each data point from each cluster.
        for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
            for (let clusterIndex = 0; clusterIndex < k; clusterIndex += 1) {
                distances.data[dataIndex]![clusterIndex] = euclideanDistance(
                    new Matrix([clusterCenters[clusterIndex]!]),
                    new Matrix([data[dataIndex]!]),
                );
            }
            // Assign the closest cluster number to each dataSet point.
            const closestClusterIdx = distances.data[dataIndex]!.indexOf(
                //@ts-ignore
                Math.min(...distances.data[dataIndex]),
            );

            // Check if data point class has been changed and we still need to re-iterate.
            if (classes[dataIndex] !== closestClusterIdx) {
                iterate = true;
            }

            classes[dataIndex] = closestClusterIdx;
        }

        // Recalculate cluster centroid values via all dimensions of the points under it.
        for (let clusterIndex = 0; clusterIndex < k; clusterIndex += 1) {
            // Reset cluster center coordinates since we need to recalculate them.
            clusterCenters[clusterIndex] = Array(dataDim).fill(0);
            let clusterSize = 0;
            for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
                if (classes[dataIndex] === clusterIndex) {
                    // Register one more data point of current cluster.
                    clusterSize += 1;
                    for (let dimensionIndex = 0; dimensionIndex < dataDim; dimensionIndex += 1) {
                        // Add data point coordinates to the cluster center coordinates.
                        clusterCenters[clusterIndex]![dimensionIndex]! += data[dataIndex]![dimensionIndex]!;
                    }
                }
            }
            // Calculate the average for each cluster center coordinate.
            for (let dimensionIndex = 0; dimensionIndex < dataDim; dimensionIndex += 1) {
                clusterCenters[clusterIndex]![dimensionIndex] = parseFloat(Number(
                    clusterCenters[clusterIndex]![dimensionIndex]! / clusterSize,
                ).toFixed(2));
            }
        }
    }

    // Return the clusters assigned.
    return classes;
}
