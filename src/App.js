import React from 'react';
import Navbar from './components/Navbar';
import ParentSection from './components/ParentSection';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

function App() {
  const parentSections = [
    {
      id: 'face-morphing',
      title: 'Face Morphing',
      sections: [
        {
          id: 'midway-face',
          title: 'Midway Face',
          content: [
            {
              type: 'paragraph', 
              text: 'In this section, we are trying to compute the "average" of 2 faces. This is created via the following steps:'
            },
            {
              type: 'list',
              items: [
                {
                  text: 'Obtain the corresponding keypoints for the two faces.',
                  sublist: [
                    'Keypoints should outline the overall structure of a face as well as the structure of some key features such as the eyes, nose, and mouth.',
                    'Ensure consistency between keypoints of both faces.',
                  ],
                },
                { text: 'Compute the average of each pair of keypoints.',
                  sublist: [
                    'This will give us a set of average keypoints that represent the midway geometry of the 2 faces.'
                  ],
                },
                { text: 'Perform a triangulation on the keypoints (e.g., Delaunay).',
                  sublist: [
                    'This triangulation should be consistent for both images. For better results, the triangulation is first performed on the set of midway keypoints. Then, this same triangulation is applied to the keypoints of the 2 faces.',
                  ],
                },
                {
                  text: 'Warp each image to the average geometry.',
                  sublist: [
                    'Warp each triangle of the original images to the corresponding triangle of the midway image.',
                    'The warping of each triangle from the original image to the midway image can be represented by an affine transformation. In homogeneous coordinates, it can be represented as matrix vector multiplication:',
                    { 
                      type: 'math', 
                      text: '\\( \\mathbf{x}\' = A \\mathbf{x} \\quad \\text{where} \\quad \\mathbf{x}\' = \\begin{bmatrix} x\' \\\\ y\' \\\\ 1 \\end{bmatrix}, \\quad A = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ 0 & 0 & 1 \\end{bmatrix}, \\quad \\mathbf{x} = \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix} \\)' 
                    },
                    'To solve for the transformation matrix A, we write an expression using the vertices of the source and destination triangles:',
                    { 
                      type: 'math', 
                      text: '\\( X A^T = X\' \\quad \\text{where} \\quad X = \\begin{bmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{bmatrix}, \\quad X\' = \\begin{bmatrix} x_1\' & y_1\' & 1 \\\\ x_2\' & y_2\' & 1 \\\\ x_3\' & y_3\' & 1 \\end{bmatrix} \\)' 
                    },
                    'After solving for A, we perform inverse warping. For each point in the destination triangle, we calculate its corresponding location (preimage) in the source triangle using the inverse of A which exists as long as the triangles are not degenerate. When the preimage does not have integer coordinates, we use bilinear interpolation to estimate the pixel value by interpolating between the 4 neighboring pixels in the source triangle. We copy this value to the corresponding pixel in the destination triangle.'
                  ]
                },
                { text: 'Cross-dissolve the 2 warped images to obtain the final midway image.',
                  sublist: [
                    'Average the 2 warped images pixel-wise.'
                  ],
                },
              ]
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Me', imageUrl: `${process.env.PUBLIC_URL}/images/me.jpeg` },
                { title: 'Triangulation', imageUrl: `${process.env.PUBLIC_URL}/images/me_tri.jpg` },
                { title: 'Ronaldo', imageUrl: `${process.env.PUBLIC_URL}/images/ronaldo3.jpeg` },
                { title: 'Triangulation', imageUrl: `${process.env.PUBLIC_URL}/images/ronaldo_tri.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Me warped to midway', imageUrl: `${process.env.PUBLIC_URL}/images/warped_me.jpg` },
                { title: 'Ronaldo warped to midway', imageUrl: `${process.env.PUBLIC_URL}/images/warped_ronaldo.jpg` },
                { title: 'Midway Face', imageUrl: `${process.env.PUBLIC_URL}/images/midway.jpg` }
              ],
            },
          ]
        },
        {
          id: 'morph-sequence',
          title: 'Morph Sequence',
          content: [
            {
              type: 'paragraph', 
              text: 'The midway face is a special case of a convex combination of two faces, where the weight t is set to 1/2. The value of t is used to compute the midway keypoints for warping as well as for cross-dissolving. By varying t from 0 to 1, we can obtain a transition from one image to another. In the example below, a sigmoid t controls the warping, while a linear t is used for the cross-dissolving.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Morph Sequence', imageUrl: `${process.env.PUBLIC_URL}/images/morph_sequence.gif` },
              ],
            }
          ]
        },
      ]
    },
    {
      id: 'mean-face',
      title: 'Mean Face',
      sections: [
        {
          id: 'mean-face',
          title: 'Mean Face',
          content: [
            { type: 'paragraph', text: 'We extend the idea of morphing 2 images to computing the mean face of a population. First, we find the average geometry by computing the average across the entire population for each keypoints. Then, we warp each face to the average geometry. Finally, we cross-dissolve the faces to obtain the mean face.' },
            { type: 'paragraph', text: 'The IMM Face Database with 37 faces is used to compute the mean face below. Then, a few faces from the database are warped to the mean geometry.' },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Mean Face', imageUrl: `${process.env.PUBLIC_URL}/images/mean_face.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Example 1', imageUrl: `${process.env.PUBLIC_URL}/images/01-1m.jpg` },
                { title: 'Example 1 warped to mean', imageUrl: `${process.env.PUBLIC_URL}/images/warped01.jpg` },
                { title: 'Example 2', imageUrl: `${process.env.PUBLIC_URL}/images/05-1m.jpg` },
                { title: 'Example 2 warped to mean', imageUrl: `${process.env.PUBLIC_URL}/images/warped05.jpg` },
                { title: 'Example 3', imageUrl: `${process.env.PUBLIC_URL}/images/06-1m.jpg` },
                { title: 'Example 3 warped to mean', imageUrl: `${process.env.PUBLIC_URL}/images/warped06.jpg` },
                { title: 'Example 4', imageUrl: `${process.env.PUBLIC_URL}/images/07-1m.jpg` },
                { title: 'Example 4 warped to mean', imageUrl: `${process.env.PUBLIC_URL}/images/warped07.jpg` },
              ],
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Me', imageUrl: `${process.env.PUBLIC_URL}/images/me3.jpg` },
                { title: 'Me warped to mean Dane', imageUrl: `${process.env.PUBLIC_URL}/images/metomean.jpg` },
                { title: 'Mean Dane warped to me', imageUrl: `${process.env.PUBLIC_URL}/images/meantome.jpg` },
              ],
            },
          ]
        },
        {
          id: 'extrapolation',
          title: 'Extrapolation',
          content: [
            { type: 'paragraph', text: 'Instead of interpolating between 2 images with weight t between 0 and 1, we can exaggerate facial features by extrapolating from the mean with t > 1.' },
            {
              type: 'image-grid',
              columns: 2,
              images: [
                { title: 'Me', imageUrl: `${process.env.PUBLIC_URL}/images/me3.jpg` },
                { title: 't = 1.5', imageUrl: `${process.env.PUBLIC_URL}/images/meextra.jpg` },
              ],
            },
          ]
        },
      ]
    },
    {
      id: 'pca',
      title: 'Principal Component Analysis',
      sections: [
        {
          id: 'pca',
          title: 'Rationale',
          content: [
            { 
              type: 'paragraph', 
              text: 'A face can be represented by a shape vector and an appearance vector. We will concern ourselves only with the geometry of a face and hence the shape vector. The shape vector consists of the flattened x and y coordinates of keypoints of a face.' 
            },
            {
              type: 'paragraph',
              text: 'Principal Component Analysis is a dimensionality reduction technique that aims to project data into a lower-dimensional space while preserving as much variance as possible. This is equivalent to minimizing the sum of squared distances between the original data points and their projections onto the subspace. Besides dimensionality reduction, PCA also removes noise and allow for better data interpretability.'
            },
            {
              type: 'list',
              items: [
                {
                  text: 'Data Matrix Setup.',
                  sublist: [
                    'We begin with a centered data matrix X of n data points (shape vectors), each of dimension d, stacked horizontally. X has rank r, where r <= d.',
                    { 
                      type: 'math', 
                      text: '\\( X = \\begin{bmatrix} \\text{------} \\mathbf{x}_1^T \\text{------} \\\\ \\text{------} \\mathbf{x}_2^T \\text{------} \\\\ \\vdots \\\\ \\text{------} \\mathbf{x}_n^T \\text{------} \\end{bmatrix} \\)' 
                    },
                    'Our goal is to project the data onto a subspace of rank l, where l < r, while preserving as much variance as possible.'
                  ]
                },
                {
                  text: 'Covariance Matrix.',
                  sublist: [
                    'To obtain the components of the desired subspace, we would have to obtain the right singular vectors on the covariance matrix:',
                    { type: 'math', text: '\\( C = \\frac{1}{n} X^T X \\)' },
                    'Instead of directly performing SVD on the covariance matrix which runs in O(d^3), we perform SVD directly on the centered data matrix X which runs on O(nd^2), since d > n in our example. This works because the right singular vectors are the same.'
                  ]
                },
                {
                  text: 'Singular Value Decomposition.',
                  sublist: [
                    'We decompose the centered data matrix using SVD:',
                    { type: 'math', text: '\\( X = U \\Sigma V^T \\)' },
                  ]
                },
                {
                  text: 'Subspace of Rank l.',
                  sublist: [
                    'The subspace of rank l that minimizes the sum of squared distances from the data to the subspace is spanned by the first l columns of the matrix V.',
                    'These components in the subspace also maximize the variance of the projected data.'
                  ]
                },
                {
                  text: 'Projection of Data.',
                  sublist: [
                    'We can project the data onto the subspace spanned by the first l components of V, representing the data in the PCA basis:',
                    { type: 'math', text: '\\( X_{\\text{proj}} = X V_l \\)' },
                  ]
                },
                {
                  text: 'Reconstruction of Data.',
                  sublist: [
                    'To reconstruct the data from the reduced PCA subspace back to the original space, we use the following:',
                    { type: 'math', text: '\\( X_{\\text{reconstructed}} = X V_l V_l^T \\)' }
                  ]
                }
              ]
            },
          ]
        },

        {
          id: 'example',
          title: 'Example',
          content: [
            {
              type: 'paragraph',
              text: 'After computing SVD on X, we plot the singular values. We will take the first 4 components since the singular values drop off significantly after.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Singular Values', imageUrl: `${process.env.PUBLIC_URL}/images/singular_values.jpg` },
              ]
            },
            {
              type: 'paragraph',
              text: 'After projecting our data points into the first 4 components, we can understand what each component represents by exaggerating or scaling up that component individually. Then, we reconstruct the image by projecting the PCA vector back into the original space of dimension d. It appears that component 0 represents the position of the face relative to the frame, component 2 represents the size of facial features relative to the face and component 3 represents the tilt of the face. Unfortunately, it is difficult to see what component 1 represents.'
            },
            {
              type: 'image-grid',
              columns: 5,
              images: [
                { title: 'Component 0 scaled by -5', imageUrl: `${process.env.PUBLIC_URL}/images/comp0_-5.jpg` },
                { title: 'Component 0 scaled by -3', imageUrl: `${process.env.PUBLIC_URL}/images/comp0_-3.jpg` },
                { title: 'Component 0 scaled by 0', imageUrl: `${process.env.PUBLIC_URL}/images/comp0_0.jpg` },
                { title: 'Component 0 scaled by 3', imageUrl: `${process.env.PUBLIC_URL}/images/comp0_3.jpg` },
                { title: 'Component 0 scaled by 5', imageUrl: `${process.env.PUBLIC_URL}/images/comp0_5.jpg` },
              ]
            },
            {
              type: 'image-grid',
              columns: 5,
              images: [
                { title: 'Component 1 scaled by -5', imageUrl: `${process.env.PUBLIC_URL}/images/comp1_-5.jpg` },
                { title: 'Component 1 scaled by -3', imageUrl: `${process.env.PUBLIC_URL}/images/comp1_-3.jpg` },
                { title: 'Component 1 scaled by 0', imageUrl: `${process.env.PUBLIC_URL}/images/comp1_0.jpg` },
                { title: 'Component 1 scaled by 3', imageUrl: `${process.env.PUBLIC_URL}/images/comp1_3.jpg` },
                { title: 'Component 1 scaled by 5', imageUrl: `${process.env.PUBLIC_URL}/images/comp1_5.jpg` },
              ]
            },
            {
              type: 'image-grid',
              columns: 5,
              images: [
                { title: 'Component 2 scaled by -5', imageUrl: `${process.env.PUBLIC_URL}/images/comp2_-5.jpg` },
                { title: 'Component 2 scaled by -3', imageUrl: `${process.env.PUBLIC_URL}/images/comp2_-3.jpg` },
                { title: 'Component 2 scaled by 0', imageUrl: `${process.env.PUBLIC_URL}/images/comp2_0.jpg` },
                { title: 'Component 2 scaled by 3', imageUrl: `${process.env.PUBLIC_URL}/images/comp2_3.jpg` },
                { title: 'Component 2 scaled by 5', imageUrl: `${process.env.PUBLIC_URL}/images/comp2_5.jpg` },
              ]
            },
            {
              type: 'image-grid',
              columns: 5,
              images: [
                { title: 'Component 3 scaled by -5', imageUrl: `${process.env.PUBLIC_URL}/images/comp3_-5.jpg` },
                { title: 'Component 3 scaled by -3', imageUrl: `${process.env.PUBLIC_URL}/images/comp3_-3.jpg` },
                { title: 'Component 3 scaled by 0', imageUrl: `${process.env.PUBLIC_URL}/images/comp3_0.jpg` },
                { title: 'Component 3 scaled by 3', imageUrl: `${process.env.PUBLIC_URL}/images/comp3_3.jpg` },
                { title: 'Component 3 scaled by 5', imageUrl: `${process.env.PUBLIC_URL}/images/comp3_5.jpg` },
              ]
            },
            {
              type: 'paragraph',
              text: 'The same steps of face morphing and extrapolation can also be performed on PCA basis. For extrapolation, we can simply scale the PCA vector and reconstruct the extrapolated image by projecting the extrpolated PCA vector back to d dimensions. This extrapolation will be smoother (highlighting only the key characteristics of a face) than extrapolation done in the normal basis.'
            },
            {
              type: 'image-grid',
              columns: 3,
              images: [
                { title: 'Original', imageUrl: `${process.env.PUBLIC_URL}/images/01-1m.jpg` },
                { title: 'Extrapolated in normal basis (t = 2)', imageUrl: `${process.env.PUBLIC_URL}/images/im01extrapolated.jpg` },
                { title: 'Extrapolated in PCA basis (t = 2)', imageUrl: `${process.env.PUBLIC_URL}/images/caricature_img_pca.jpg` },
              ]
            },
          ]
        }
          
        
      ]
    },
    {
      id: 'extra',
      title: 'Extra',
      sections: [
        {
          id: 'morph-2-faces',
          title: 'Automatic Morphing',
          content: [
            { type: 'paragraph', text: 'Instead of manually selecting keypoints of 2 images, this can be done automatically with libraries such as dlib shape_predictor_68_face_landmarks.' },
            {
              type: 'image-grid',
              columns: 4,
              images: [
                { title: 'Me (auto)', imageUrl: `${process.env.PUBLIC_URL}/images/me_keypoints_triangles.jpg` },
                { title: 'Ronaldo (auto)', imageUrl: `${process.env.PUBLIC_URL}/images/ronaldo_keypoints_triangles.jpg` },
                { title: 'Midway (auto)', imageUrl: `${process.env.PUBLIC_URL}/images/midway_face_auto.jpg` },
                { title: 'Midway (manual)', imageUrl: `${process.env.PUBLIC_URL}/images/midway.jpg` },
              ],
            },
          ]
        },
        {
          id: 'modify-a-face',
          title: 'Modify a Face',
          content: [
            { type: 'paragraph', text: 'Modify facial proportions and expressions by dragging keypoints interactively. Here is an example:' },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Interactive tool', imageUrl: `${process.env.PUBLIC_URL}/images/output.gif` },
              ],
            },
          ]
        },
      ]
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-300">
      <Navbar parentSections={parentSections} />
      <div className="flex-1 px-4 sm:px-2 lg:px-8 py-8 md:ml-64 w-full">
        <h1 className="text-3xl sm:text-2xl lg:text-4xl font-bold text-center mb-12 text-white">Face Morphing</h1>

        {parentSections.map((parent) => (
          <ParentSection
            key={parent.id}
            id={parent.id}
            title={parent.title}
            sections={parent.sections}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
